import React, { Component, PropTypes } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import cookie from "react-cookie";
import { bindActionCreators } from "redux";
import * as requestsActions from "../../../actions/requestsActions";
import * as loadingActions from "../../../actions/loadingActions";
import Layout from "../../../components/layout";
import AnswerModal from "../../../components/answerModal";
import List from "./components/list";
class RequestList extends Component {
  static propTypes = {
    setLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    /**
     * redux object with current user information
     */
    currentUser: PropTypes.object.isRequired,
    /**
     * redux action to update request status
     */
    updateAsyncRequestStatus: PropTypes.func.isRequired,
    /**
     * redux array of requestsList
     */
    requestsList: PropTypes.array.isRequired,
    /**
     * redux function to fetch the requests list and set it as requestsList
     */
    getAsyncRequestsListAction: PropTypes.func.isRequired
  };
  constructor() {
    super();

    this.state = {
      modal: false,
      selectedRequest: 0,
      decline_note: ""
    };
    this.pushRoute = this.pushRoute.bind(this);
    this.updateRequestStatus = this.updateRequestStatus.bind(this);
    this.filterRequestsList = this.filterRequestsList.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggle(type: string, note: string, selectedRequest) {
    this.setState({ selectedRequest: selectedRequest ? selectedRequest : 0 });
    if (type === "accept") {
      this.updateRequestStatus(this.state.selectedRequest, 3);
    }

    this.setState({
      modal: !this.state.modal
    });
  }

  /**
   * Push a route when user clicks on table row
   * @param {string} route - The route to where to push.
   */
  pushRoute(route: String) {
    Router.push(route);
  }

  async updateRequestStatus(requestId: number, statusId: number) {
    const { updateAsyncRequestStatus, currentUser, setLoading } = this.props;
    const { decline_note } = this.state;
    setLoading(true);
    try {
      const sessionToken = cookie.load("sessionToken");
      const subscriberId = currentUser.subscriberid;
      await updateAsyncRequestStatus(
        requestId,
        statusId,
        decline_note,
        sessionToken,
        subscriberId
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  filterRequestsList(status: string) {
    const { requestsList } = this.props;
    let array = [];
    requestsList.map(req => {
      if (req.status === status) {
        array.push(req);
      }
    });
    return array;
  }

  componentDidMount() {
    console.log(this.props.requestsList);
  }

  render() {
    const { loading } = this.props;
    const { modal, selectedRequest, decline_note } = this.state;
    return (
      <Layout title="Lista de solicitudes">
        <div className="container" style={{ marginTop: 25 }}>
          <div className="row">
            <div className="col-sm-12">
              <h1>Lista de solicitudes pendientes</h1>
            </div>
          </div>
          <List
            loading={loading}
            updateRequestStatus={this.updateRequestStatus}
            toggleModal={this.toggle}
            list={this.filterRequestsList("pending")}
            type={"pending"}
          />
        </div>
        <div className="container" style={{ marginTop: 25 }}>
          <div className="row">
            <div className="col-sm-12">
              <h1>Lista de solicitudes aceptadas</h1>
            </div>
          </div>
          <List list={this.filterRequestsList("accepted")} type={"accepted"} />
        </div>
        <div className="container" style={{ marginTop: 25 }}>
          <div className="row">
            <div className="col-sm-12">
              <h1>Lista de subastas completadas</h1>
            </div>
          </div>
          <List
            list={this.filterRequestsList("completed")}
            type={"completed"}
          />
        </div>
        <div className="container" style={{ marginTop: 25 }}>
          <div className="row">
            <div className="col-sm-12">
              <h1>Lista de subastas ya completadas y con ganador</h1>
            </div>
          </div>
          <List
            list={this.filterRequestsList("winner selected")}
            type={"winner selected"}
          />
        </div>
        <div className="container" style={{ marginTop: 25 }}>
          <div className="row">
            <div className="col-sm-12">
              <h1>Lista de solicitudes rechazadas</h1>
            </div>
          </div>
          <List list={this.filterRequestsList("declined")} type={"declined"} />
        </div>
        <AnswerModal
          modalTitle={"¿Declinar requisición?"}
          modal={modal}
          toggle={this.toggle}
          selectedRequest={selectedRequest}
        >
          <div className="md-form">
            <i className="fa fa-pencil prefix" />
            <textarea
              value={decline_note}
              onChange={this.handleInputChange}
              type="text"
              id="decline_note"
              name="decline_note"
              className="md-textarea"
            />
            <label htmlFor="decline_note">Nota</label>
          </div>
        </AnswerModal>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestsList: state.requestsList,
    currentUser: state.currentUser,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...requestsActions, ...loadingActions },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
