// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import Router from "next/router";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as usersActions from "../../../actions/usersActions";
import * as loadingActions from "../../../actions/loadingActions";
import * as suppliersActions from "../../../actions/suppliersActions";
import * as requestsActions from "../../../actions/requestsActions";
import Layout from "../../../components/layout";
import SuppliersList from "./components/suppliersList";
import CardList from "./components/cardList";
import AddSupplierModal from "./components/addSupplierModal";
import { createBid, setBidWinner } from "../../../api/bids";
import { updateRequestEndDate } from "../../../api/requests";
type Request = {
  id: number
};
class Detail extends Component {
  props: {
    /**
     * redux function to fetch single request by id
     */
    getAsyncSingleRequestAction: (requestId: number) => any,
    /**
     * redux object of request
     */
    request: Request,
    /**
     * redux function in this case to get the suppliers
     */
    getAsyncUsersAction: (
      subscriberId: number,
      regionId: ?number,
      roleId: number
    ) => any,
    /**
     * redux array of users, in this case, the suppliers
     */
    users: Array<Object>,
    /**
     * redux object containing current logged in user
     */
    currentUser: Object,
    loading: boolean,
    /**
     * redux function
     */
    setLoading: (boolean) => any,
    /**
     * redux function to fetch the request current added suppliers.
     */
    fetchAsyncRequestSuppliersAction: (requestId: number) => any,
    /**
     * redux array containing the request suppliers fetched with fetchAsyncRequestSuppliersAction
     */
    requestSuppliers: Array<Object>
  };

  state: {
    modal: boolean,
    filteredSuppliers: Array<Object>,
    pendingSuppliers: Array<Object>,
    disableWinners: boolean,
    end_date: string
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      filteredSuppliers: [],
      pendingSuppliers: [],
      disableWinners: false,
      end_date: props.request.end_date
        ? moment(props.request.end_date)
        : moment()
    };

    (this: any).toggle = this.toggle.bind(this);
    (this: any).setPendingToAdd = this.setPendingToAdd.bind(this);
    (this: any).addSuppliers = this.addSuppliers.bind(this);
    (this: any).setWinner = this.setWinner.bind(this);
    (this: any).changeDate = this.changeDate.bind(this);
  }

  async componentWillMount(): any {
    const { requestSuppliers } = this.props;

    const accepted = await requestSuppliers.find(o => {
      return o.accepted === true;
    });
    if (accepted) this.setState({ disableWinners: true });
  }

  componentDidMount(): any {
    const { request, currentUser } = this.props;
    if (
      request &&
      request.regionid !== currentUser.regionid &&
      currentUser.roleid !== 5
    )
      return Router.push("/dashboard");
  }

  async toggle() {
    const {
      getAsyncUsersAction,
      currentUser,
      request,
      setLoading,
      fetchAsyncRequestSuppliersAction
    } = this.props;
    setLoading(true);
    let suppliers = [];
    if (!this.state.modal) {
      /**
       * fetches the suppliers
       */
      await getAsyncUsersAction(currentUser.subscriberid, null, 3);
      /**
       * filter the suppliers. If they have been already added, they will not be shown in the modal list.
       */
      if (this.props.requestSuppliers.length <= 0) {
        this.props.users.map(supplier => {
          suppliers.push(supplier);
        });
      } else {
        this.props.users.map(supplier => {
          const repeatedSupplier = _.find(this.props.requestSuppliers, o => {
            return o.supplierid === supplier.id;
          });
          // if repeatedSupplier (if there are no repeated suppliers in list) is undefined, add the supplier
          if (!repeatedSupplier) suppliers.push(supplier);
        });
      }
    } else {
      await fetchAsyncRequestSuppliersAction(request.id);
    }
    this.setState({
      modal: !this.state.modal,
      filteredSuppliers: suppliers,
      pendingSuppliers: []
    });
    setLoading(false);
  }

  setPendingToAdd(supplier: Object) {
    const { pendingSuppliers } = this.state;
    let suppliers = [...pendingSuppliers];
    let add = true;
    // if pendingSuppliers has already one supplier added in list
    if (pendingSuppliers.length > 0) {
      // loop through the pendingSuppliers
      pendingSuppliers.map(sup => {
        if (sup.id === supplier.id) {
          // return a message stating the supplier has already been added before
          toastr["error"](`Ya ${supplier.companyname} está agregado`);
          add = false;
        }
      });
      suppliers.push(supplier);
    } else {
      // if pendingSuppliers length is less or equal than 0
      // push the supplier to the pendingSuppliers list
      suppliers.push(supplier);
    }
    // set the pendingSuppliers state with the newly created array of suppliers.
    if (add) this.setState({ pendingSuppliers: suppliers });
  }

  async addSuppliers() {
    const { pendingSuppliers } = this.state;
    const { request, setLoading } = this.props;
    setLoading(true);
    try {
      for (let i = 0; i < pendingSuppliers.length; i++) {
        await createBid(pendingSuppliers[i].id, request.id);
        if (i === pendingSuppliers.length - 1) {
          await this.toggle();
        }
      }
    } catch (err) {
      if (err.response && err.response.data) console.error(err.response.data);
      console.error("Error: ", err);
      toastr["error"]("Verificar consola o contactar a soporte.", "Error");
    }
    setLoading(false);
  }

  async setWinner(bidid: number) {
    const { id } = Router.query;
    const { fetchAsyncRequestSuppliersAction, setLoading } = this.props;

    const note: string = window.prompt("Porqué se selecciona como ganador?");
    if (note) {
      try {
        setLoading(true);
        await setBidWinner(id, bidid, note);
        await fetchAsyncRequestSuppliersAction(id);
        this.setState({ disableWinners: true });
        setLoading(false);
      } catch (err) {
        if (err.response) console.error(err.response.data);
        console.error(err);
        setLoading(false);
      }
    }
  }
  async changeDate(date) {
    const { request, getAsyncSingleRequestAction, setLoading } = this.props;
    setLoading(true);
    if (
      confirm(
        "Estás seguro que quieres poner fecha final? Una vez puesto, no se podrá cambiar."
      )
    ) {
      await this.setState({ end_date: date });
      try {
        const response = await updateRequestEndDate(
          request.id,
          this.state.end_date
        );
        await getAsyncSingleRequestAction(request.id);
        console.log("success: ", response);
      } catch (err) {
        if (err.data && err.data.message)
          console.error("Error: ", err.data.message);
        console.error("Err: ", err);
      }
    }
    setLoading(false);
  }

  render() {
    const { request, loading, requestSuppliers } = this.props;
    const {
      modal,
      filteredSuppliers,
      pendingSuppliers,
      disableWinners,
      end_date
    } = this.state;
    return (
      <Layout title="Detalle de solicitud">
        <div className="container">
          <div className="row" style={{ marginTop: 25 }}>
            <div className="col-sm-12">
              <h1>Detalle de solicitud</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <CardList seeMore={false} req={request} />
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">Suplidores</h4>
                  <hr />
                  <div className="md-form">
                    <DatePicker
                      selected={end_date}
                      onChange={this.changeDate}
                      minDate={moment().add(1, "d")}
                      className="form-control"
                      disabled={request.end_date || loading}
                    />
                    <label htmlFor="date-picker-example" className="active">
                      Subasta corre hasta:
                    </label>
                  </div>
                  <p className="card-text">
                    Al agregar suplidores, se les enviará notificación y podras ver aquí sus ofertas finales.
                  </p>
                  <SuppliersList
                    disableWinners={disableWinners}
                    loading={loading}
                    bids={requestSuppliers}
                    setWinner={this.setWinner}
                  />
                  <button
                    disabled={loading || disableWinners}
                    className="btn btn-primary waves-effect"
                    onClick={this.toggle}
                  >
                    Agregar suplidor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddSupplierModal
          suppliers={filteredSuppliers}
          pendingSuppliers={pendingSuppliers}
          setPendingToAdd={this.setPendingToAdd}
          modal={modal}
          toggle={this.toggle}
          addSuppliers={this.addSuppliers}
          loading={loading}
        />
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    request: state.request,
    users: state.users,
    currentUser: state.currentUser,
    loading: state.loading,
    requestSuppliers: state.requestSuppliers
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...usersActions,
      ...loadingActions,
      ...suppliersActions,
      ...requestsActions
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
