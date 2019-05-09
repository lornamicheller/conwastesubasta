import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Router from "next/router";
import * as loadingActions from "../../../actions/loadingActions";
import * as authActions from "../../../actions/authActions";
import { setPassword } from "../../../api/users";
import Layout from "../../../components/layout";
class SetPassword extends Component {
  static propTypes = {
    /**
     * redux object containing currentUser info
     */
    currentUser: PropTypes.object.isRequired,
    /**
     * redux loading bool
     */
    loading: PropTypes.bool.isRequired,
    /**
     * redux function to set loading boolean.
     */
    setLoading: PropTypes.func.isRequired,
    /**
     * redux function
     */
    setAsyncCurrentUserAction: PropTypes.func.isRequired
  };
  constructor() {
    super();

    this.state = {
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * if user has already changed password, redirect to dashboard page.
   */
  async componentDidMount() {
    await this.props.setAsyncCurrentUserAction();
    if (this.props.currentUser.passwordchange) return Router.push("/dashboard");
  }

  handleChange(event) {
    this.setState({ password: event.target.value });
  }

  async submit(e) {
    e.preventDefault();
    const { currentUser, setLoading } = this.props;
    try {
      setLoading(true);
      await setPassword(this.state.password, currentUser.id);
      toastr["success"]("Se ha cambiado el password.");
      Router.push("/dashboard");
    } catch (err) {
      console.error("Error submit: ", err);
      if (err.response && err.response.data) console.error(err.response.data);
      setLoading(false);
      toastr["error"](
        "Error al tratad de cambiar password. Verificar consola o contactar soporte."
      );
    }
  }

  render() {
    const { password } = this.state;
    const { loading } = this.props;
    return (
      <Layout title="Cambiar password predeterminado">
        <div className="container">
          <div
            className="row containerFlexCol alignCenter flexCenter"
            style={{ marginTop: 45, minHeight: "70vh" }}
          >
            <div className="col-sm-4">
              <form>
                <div className="card">
                  <div className="card-block">

                    <div className="form-header blue-gradient">
                      <h3><i className="fa fa-lock" /> Password nuevo:</h3>
                    </div>

                    <div className="md-form">
                      <i className="fa fa-lock prefix" />
                      <input
                        onChange={this.handleChange}
                        value={password}
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                      />
                      <label htmlFor="password">Password nuevo</label>
                    </div>

                    <div className="text-center">
                      <button
                        disabled={loading}
                        onClick={this.submit}
                        className="btn btn-primary waves-effect"
                      >
                        Cambiar
                      </button>
                    </div>

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...loadingActions, ...authActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
