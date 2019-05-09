import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CardList from "./components/cardList";
import Layout from "../../../components/layout";
import * as requestsActions from "../../../actions/requestsActions";
import * as loadingActions from "../../../actions/loadingActions";
import CircularLoading from "../../../components/circularLoading";
class Applications extends Component {
  static propTypes = {
    /**
     * redux function to get requests list
     * @param subscriberId
     * @param regionId
     * @param statusId
     */
    getAsyncRequestsListAction: PropTypes.func.isRequired,
    /**
     * redux action to set the requests list in state
     */
    setRequestsListAction: PropTypes.func.isRequired,
    /**
     * redux state for requestList
     */
    requestsList: PropTypes.array.isRequired,
    /**
     * redux object containing currentUser
     */
    currentUser: PropTypes.object.isRequired,
    /**
     * redux function to change the loading state true/false
     * @param {boolean} loading
     */
    setLoading: PropTypes.func.isRequired,
    /**
     * redux boolean state for loading
     */
    loading: PropTypes.bool.isRequired
  };

  constructor() {
    super();

    this.state = {
      stateLoading: false
    };

    this.refreshRequests = this.refreshRequests.bind(this);
  }

  async refreshRequests(requestStatusId: number) {
    const {
      getAsyncRequestsListAction,
      currentUser,
      setLoading
    } = this.props;
    try {
      this.setState({ stateLoading: true });
      await getAsyncRequestsListAction(
        currentUser.subscriberid,
        currentUser.regionid,
        requestStatusId
      );
      this.setState({ stateLoading: false });
    } catch (err) {
      console.error(err);
      this.setState({ stateLoading: false });
    }
  }

  render() {
    const { requestsList, loading } = this.props;
    const { stateLoading } = this.state;
    return (
      <Layout title="Solicitudes">
        <div className="container">
          <div className="row">
            <div className="col-sm-12" style={{ marginTop: 25 }}>
              <h1>Solicitudes</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <ul
                className="nav nav-tabs tabs-2 primary-color-dark"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active waves-effect"
                    data-toggle="tab"
                    href="#panel1"
                    role="tab"
                    onClick={() => this.refreshRequests(2)}
                  >
                    Pendientes
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link waves-effect"
                    data-toggle="tab"
                    href="#panel2"
                    role="tab"
                    onClick={() => this.refreshRequests(4)}
                  >
                    Completadas
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link waves-effect"
                    data-toggle="tab"
                    href="#panel3"
                    role="tab"
                    onClick={() => this.refreshRequests(5)}
                  >
                    Ganadores seleccionados
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade in show active"
                  id="panel1"
                  role="tabpanel"
                >
                  <br />
                  {stateLoading &&
                    <div
                      className="d-flex flex-row flex-center align-items-center"
                    >
                      <CircularLoading />
                    </div>}
                  {!stateLoading &&
                    <div className="row">
                      {requestsList.map((req, index) => (
                        <div key={index} className="col-sm-6 col-12">
                          <CardList seeMore={true} req={req} />
                        </div>
                      ))}
                    </div>}
                </div>
                <div className="tab-pane fade" id="panel2" role="tabpanel">
                  <br />
                  {stateLoading &&
                    <div
                      className="d-flex flex-row flex-center align-items-center"
                    >
                      <CircularLoading />
                    </div>}
                  {!stateLoading &&
                    <div className="row">
                      {requestsList.map((req, index) => (
                        <div key={index} className="col-sm-6 col-12">
                          <CardList seeMore={true} req={req} />
                        </div>
                      ))}
                    </div>}
                </div>
                <div className="tab-pane fade" id="panel3" role="tabpanel">
                  <br />
                  {stateLoading &&
                    <div
                      className="d-flex flex-row flex-center align-items-center"
                    >
                      <CircularLoading />
                    </div>}
                  {!stateLoading &&
                    <div className="row">
                      {requestsList.map((req, index) => (
                        <div key={index} className="col-sm-6 col-12">
                          <CardList seeMore={true} req={req} />
                        </div>
                      ))}
                    </div>}
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Applications);
