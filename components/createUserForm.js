// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserForm from "./userForm";
import { createUser } from "../api/users";
import * as loadingActions from "../actions/loadingActions";
import * as regionsActions from "../actions/regionsActions";
type Props = {
  /**
   * redux array of regions
   */
  regions: Array<Object>,
  /**
   * redux function to fetch the regions
   */
  getAsyncRegionsAction: (subscriberId: number) => any,
  /**
   * redux object with current logged in user information
   */
  currentUser: Object,
  /**
   * redux function to set booloan of loading status
   */
  setLoading: (boolean) => any,
  /**
   * redux boolean for loading state
   */
  loading: boolean,
  /**
   * redirect function to execute after user creation
   */
  redirectAction: () => any,
  /**
   * if true it will setup the form to only create suppliers and hide the user type select input field
   */
  supplierForm: boolean,
  /**
   * redux form
   */
  form: Object
};
type State = {
  initialValues: Object
};
class CreateUserForm extends Component {
  props: Props;
  state: State;
  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        initialValues: {
          userType: this.props.supplierForm ? 3 : "",
          email: "",
          region: this.props.supplierForm ? null : ""
        }
      }
    };

    (this: any).createUser = this.createUser.bind(this);
  }
  componentDidMount() {
    const { getAsyncRegionsAction, currentUser, supplierForm } = this.props;
    if (!supplierForm) getAsyncRegionsAction(currentUser.subscriberid);
  }

  async createUser() {
    const {
      currentUser,
      setLoading,
      redirectAction,
      form: { userForm: { values } }
    } = this.props;
    try {
      setLoading(true);
      await createUser(
        values.name,
        values.lastname,
        values.email,
        undefined,
        values.companyname,
        values.companyphone,
        values.contactname,
        values.userType,
        values.region,
        currentUser.subscriberid
      );
      toastr["success"]("User created.");
      redirectAction();
    } catch (err) {
      if (err.response && err.response.data) {
        console.error(err.response.data);
        toastr["error"](err.response.data.message);
      }
      setLoading(false);
      console.error("Error createUser: ", err);
    }
  }

  render() {
    const { initialValues } = this.state;
    const { supplierForm } = this.props;
    return (
      <div>
        <div className="card">
          <div className="card-block">
            <div className="form-header  blue-gradient">
              {!supplierForm && <h3>Crear usuario:</h3>}
              {supplierForm && <h3>Crear suplidor:</h3>}
            </div>
            <UserForm
              {...initialValues}
              supplierForm={supplierForm}
              onSubmit={this.createUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    regions: state.regions,
    currentUser: state.currentUser,
    loading: state.loading,
    form: state.form
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ ...loadingActions, ...regionsActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm);
