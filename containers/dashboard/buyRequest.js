import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Router from "next/router";
import cookie from "react-cookie";
import * as regionsActions from "../../actions/regionsActions";
import * as projectsActions from "../../actions/projectsActions";
import * as loadingActions from "../../actions/loadingActions";
import * as usersActions from "../../actions/usersActions";
import Layout from "../../components/layout";
import BuyRequestForm from "../../components/buyRequestForm";
import { createRequest } from "../../api/requests";
class BuyRequest extends Component {
  static propTypes = {
    /**
     * redux object with currentUser
     */
    currentUser: PropTypes.object.isRequired,
    /**
     * redux function to get all users
     */
    getAsyncUsersAction: PropTypes.func.isRequired,
    /**
     * redux array of users set by getAsyncUsersAction
     */
    supervisors: PropTypes.array.isRequired,
    /**
     * redux function for loading effect
     */
    setLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    /**
     * redux array
     */
    regions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    /**
     * redux function to fetch form api the projects by regionId
     * @param {number} regionId
     */
    getAsyncProjectsByRegionAction: PropTypes.func.isRequired,
    /**
     * redux function to set the fetched projects
     */
    setProjectsAction: PropTypes.func.isRequired,
    /**
     * redux array been set by projectsActions
     */
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired
  };
  constructor() {
    super();

    this.state = {
      selectedRegion: 0,
      selectedProject: 0,
      selectedSupervisor: 0,
      articleName: "",
      quantity: 0,
      note: "",
      workOrder: "",
      disable: true
    };
    this.regionSelectChange = this.regionSelectChange.bind(this);
    this.projectSelectChange = this.projectSelectChange.bind(this);
    this.supervisorSelectChange = this.supervisorSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentDidMount() {
    const { setProjectsAction } = this.props;
    setProjectsAction([]);
  }
  async regionSelectChange(e) {
    const {
      getAsyncProjectsByRegionAction,
      setLoading,
      getAsyncUsersAction,
      currentUser
    } = this.props;
    setLoading(true);
    const regionId = parseInt(e.target.value);
    this.setState({
      selectedRegion: regionId,
      selectedProject: 0,
      selectedSupervisor: 0
    });
    await Promise.all([
      getAsyncProjectsByRegionAction(regionId),
      getAsyncUsersAction(currentUser.subscriberid, regionId, 1)
    ]);

    setLoading(false);
  }
  projectSelectChange(e) {
    this.setState({ selectedProject: parseInt(e.target.value) });
  }
  supervisorSelectChange(e) {
    this.setState({ selectedSupervisor: parseInt(e.target.value) });
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    value = name === "quantity" ? parseInt(value) : value;

    this.setState({
      [name]: value
    });
    setTimeout(() => {
      const {
        selectedRegion,
        selectedProject,
        selectedSupervisor,
        articleName,
        quantity,
        note,
        workOrder
      } = this.state;
      if (
        selectedRegion !== 0 &&
        selectedProject !== 0 &&
        selectedSupervisor !== 0 &&
        articleName !== "" &&
        quantity > 0
      ) {
        this.setState({ disable: false });
      } else {
        this.setState({ disable: true });
      }
    });
  }

  async submitForm(e) {
    e.preventDefault();
    const { setLoading } = this.props;
    setLoading(true);
    const {
      selectedRegion,
      selectedProject,
      selectedSupervisor,
      articleName,
      quantity,
      note,
      workOrder
    } = this.state;
    const requisition = {
      selectedRegion,
      selectedProject,
      selectedSupervisor,
      articleName,
      quantity,
      note,
      workOrder,
      sessionToken: cookie.load("sessionToken")
    };
    try {
      const response = await createRequest(requisition);
      console.log("Success: ", response);
      toastr["success"](
        "Requisición creado correctamente, recivirás notificación cuando supervisor la verifique."
      );
      Router.push("/dashboard");
    } catch (err) {
      console.error("Error: ", err);
      toastr["error"](
        "Error al crear requisición, verificar consola o contactar soporte."
      );
      setLoading(false);
    }
  }

  render() {
    const { regions, projects, loading, supervisors } = this.props;
    const {
      selectedRegion,
      selectedProject,
      selectedSupervisor,
      articleName,
      quantity,
      note,
      workOrder,
      disable
    } = this.state;
    return (
      <Layout title="Buy Request">
        <div className="container" style={{ marginTop: 45 }}>
          <div className="row">
            <div className="col-sm-4 col-12 offset-sm-4">
              <div className="card">
                <div className="card-block">
                  <div className="form-header blue-gradient">
                    <h3>Requisición de compra:</h3>
                  </div>

                  <BuyRequestForm
                    selectedRegion={selectedRegion}
                    selectedProject={selectedProject}
                    selectedSupervisor={selectedSupervisor}
                    regionSelectChange={this.regionSelectChange}
                    projectSelectChange={this.projectSelectChange}
                    supervisorSelectChange={this.supervisorSelectChange}
                    regions={regions}
                    projects={projects}
                    supervisors={supervisors}
                    articleName={articleName}
                    quantity={quantity}
                    note={note}
                    workOrder={workOrder}
                    handleInputChange={this.handleInputChange}
                    submitForm={this.submitForm}
                    loading={loading}
                    readOnly={false}
                    disable={disable}
                  />
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
    regions: state.regions,
    projects: state.projects,
    loading: state.loading,
    supervisors: state.users,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...regionsActions,
      ...projectsActions,
      ...loadingActions,
      ...usersActions
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyRequest);
