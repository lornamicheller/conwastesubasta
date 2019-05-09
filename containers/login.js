import React, { Component, PropTypes } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from 'next/link';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authActions";
import cookie from "react-cookie";
import LoginForm from "../components/loginForm";
import { login } from "../api/login";
/**
 * Home component to show basic redux usage with nextjs.
 */
class Login extends Component {
  static propTypes = {
    /**
     * redux function to check if user is authenticated
     */
    authAsyncAction: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loading: false
    };
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    if (this.props.isAuthenticated) return Router.push("/dashboard");
  }

  async login(e) {
    e.preventDefault();
    const { email, password, loading } = this.state;
    this.setState({ loading: true });
    try {
      const loginResponse = await login(email, password);
      console.log("success: ", loginResponse);
      cookie.save("sessionToken", loginResponse.data.token, { path: "/" });
      Router.push("/dashboard");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        alert(err.response.data);
      } else {
        console.log("Error", err.message);
        alert(err.message);
      }
      console.log("ERROR: ", err.config);
      this.setState({ loading: false });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { email, password, loading } = this.state;
    return (
      <div
        style={{ minHeight: "100vh" }}
        className="container-fluid containerFlexRow alignCenter flexCenter"
      >
        <Head>
          <title>Conwaste Subasta Login</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/css/theme.min.css" />
          <link rel="stylesheet" href="/static/css/global.css" />
        </Head>
        <div className="row containerFlexRow flexCenter alignCenter">
          <div className="col-sm-6 col-12">
            <div className="card">
              <div style={{ padding: 15 }}>
                <img
                  className="card-img-top"
                  src="/static/images/conwaste-logo.png"
                  alt="Card image cap"
                />
              </div>
              <div className="card-block">
                <h4 className="card-title">Iniciar sessión</h4>
                <LoginForm
                  loading={loading}
                  handleInputChange={this.handleInputChange}
                  login={this.login}
                  email={email}
                  password={password}
                />
                <p className="card-text">
                  Si no tienes una cuenta aún favor comunicarse al 787-273-7639 ó registre una cuenta
                  {' '}
                  <Link href="/register">
                    <a>
                      oprimiendo aquí
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <script type="text/javascript" src="/static/js/jquery-2.2.3.min.js" />
        <script type="text/javascript" src="/static/js/tether.min.js" />
        <script type="text/javascript" src="/static/js/bootstrap.min.js" />
        <script type="text/javascript" src="/static/js/theme.min.js" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
