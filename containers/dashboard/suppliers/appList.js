import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { updateBid } from "../../../api/bids";
import * as requestsActions from "../../../actions/requestsActions";
import * as bidsActions from "../../../actions/bidsActions";
import * as loadingActions from "../../../actions/loadingActions";
import Layout from "../../../components/layout";
class AppList extends Component {
  static propTypes = {
    /**
     * redux object containing current logged in user
     */
    currentUser: PropTypes.object.isRequired,
    /**
     * redux function to set the loading boolean thus animation will show of loading
     */
    setLoading: PropTypes.func.isRequired,
    /**
     * redux object containing loading boolean
     */
    loading: PropTypes.bool.isRequired,
    /**
     * redux function to fetch the bid to be bidded on
     */
    fetchSingleBidAction: PropTypes.func.isRequired,
    /**
     * redux object containing bid information
     */
    bid: PropTypes.object.isRequired,
    /**
     * redux array set by getAsyncSupplierRequests
     */
    supplierRequests: PropTypes.array.isRequired,
    /**
     * redux function to fetch supplier requests
     * @param {number} supplierid - The id of the supplier you want to fetch the requests
     */
    getAsyncSupplierRequests: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      bidamount: 0
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateBid = this.updateBid.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    console.log(this.props.supplierRequests);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  async showModal(bidid: number) {
    const { fetchSingleBidAction, setLoading } = this.props;
    setLoading(true);
    await fetchSingleBidAction(bidid);
    setLoading(false);
    console.log(this.props.bid);
    this.setState({
      modal: true
    });
  }
  hideModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  async updateBid(e) {
    e.preventDefault();
    const { bidamount } = this.state;
    const {
      bid,
      setLoading,
      getAsyncSupplierRequests,
      currentUser
    } = this.props;
    setLoading(true);
    const id = bid.id;
    try {
      await updateBid({ id, bidamount });
      await getAsyncSupplierRequests(currentUser.id);
      toastr["success"](
        `
        Apuesta guardada correctamente. Usted recivirá una notificación cuando la subasta haya terminado.
      `
      );
      this.hideModal();
    } catch (err) {
      console.error("there was an error: ", err);
      toastr["error"](
        `
        Hubo un error. Verificar consola o contactar soporte.
      `
      );
    }
    setLoading(false);
  }
  render() {
    const { supplierRequests, bid, loading } = this.props;
    const { modal, bidamount } = this.state;
    return (
      <Layout title="Lista de subastas">
        <Modal isOpen={modal} toggle={this.hideModal} size="sm">
          <form>
            <ModalHeader toggle={this.hideModal}>
              Apostar a {bid.articlename}
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-12">
                  <h6>
                    <span className="font-weight-bold">
                      Cantidad de artículos:
                    </span>
                    {" "}
                    {bid.quantity}
                  </h6>
                </div>
                <div className="col-12">
                  <div className="md-form form-sm">
                    <input
                      value={bidamount}
                      onChange={this.handleInputChange}
                      type="number"
                      id="bidamount"
                      name="bidamount"
                      className="form-control"
                      required
                      min="0"
                    />
                    <label htmlFor="bidamount" className="">Cantidad</label>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                disabled={loading || bidamount <= 0}
                className="btn btn-primary btn-sm waves-effect"
                onClick={this.updateBid}
                type="submit"
              >
                Apostar
              </button>
              {" "}
              <button
                disabled={loading}
                className="btn btn-danger btn-sm waves-effect"
                onClick={this.hideModal}
                type="button"
              >
                Cancelar
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="container">
          <div className="row" style={{ marginTop: 25 }}>
            <div className="col-12">
              <h1>Subastas</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-12">

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nombre de artículo</th>
                      <th>Cantidad de artículo requeridos</th>
                      <th>Región</th>
                      <th>Proyecto</th>
                      <th>Nota</th>
                      <th>Cantidad de apuesta</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierRequests.map((bid, index) => {
                      if (bid.statusid === 2) {
                        return (
                          <tr key={index}>
                            <td>{bid.articlename}</td>
                            <td>{bid.quantity}</td>
                            <td>{bid.regionname}</td>
                            <td>{bid.projectname}</td>
                            <td>{bid.note}</td>
                            <td>{bid.bidamount}</td>
                            <td>
                              {bid.bidamount <= 0 &&
                                <button
                                  disabled={loading}
                                  onClick={() => this.showModal(bid.id)}
                                  className="btn btn-dark-green waves-effect"
                                >
                                  <i className="fa fa-money" /> Apostar
                                </button>}
                              {bid.bidamount > 0 &&
                                <button
                                  disabled={true}
                                  className="btn btn-blue-grey waves-effect"
                                >
                                  <i className="fa fa-check" /> Ya ha apostado
                                </button>}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          <div className="row" style={{ marginTop: 25 }}>
            <div className="col-12">
              <h1>Subastas Completadas</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-12">

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nombre de artículo</th>
                      <th>Cantidad de artículo requeridos</th>
                      <th>Región</th>
                      <th>Proyecto</th>
                      <th>Nota</th>
                      <th>Cantidad de apuesta</th>
                      <th>Estatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierRequests.map((bid, index) => {
                      if (bid.statusid === 4 || bid.statusid === 5) {
                        return (
                          <tr key={index}>
                            <td>{bid.articlename}</td>
                            <td>{bid.quantity}</td>
                            <td>{bid.regionname}</td>
                            <td>{bid.projectname}</td>
                            <td>{bid.note}</td>
                            <td>{bid.bidamount}</td>
                            {!bid.accepted &&
                              bid.statusid === 4 &&
                              <td className="blue-grey-text small">
                                Seleccionando ganador
                              </td>}
                            {bid.accepted &&
                              <td className="green-text">
                                Ganador
                              </td>}
                            {!bid.accepted &&
                              bid.statusid === 5 &&
                              <td className="red-text">
                                Has perdido
                              </td>}
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    supplierRequests: state.supplierRequests,
    bid: state.bid,
    loading: state.loading,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...requestsActions, ...bidsActions, ...loadingActions },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
