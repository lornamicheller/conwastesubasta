import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cookie from "react-cookie";
import EasyTransition from "react-easy-transition";
import * as authActions from "../actions/authActions";
import * as loadingActions from "../actions/loadingActions";
import verifyRoutePermision from "../api/routes";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Router from "next/router";
import Link from "next/link";
import Head from "next/head";

class Layout extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    setAsyncCurrentUserAction: PropTypes.func.isRequired,
    /**
     * redux boolean to check if user is authenticated
     */
    isAuthenticated: PropTypes.bool.isRequired,
    /**
     * redux action to send api request to set isAuthenticated via session cookie setted when login in
     */
    authAsyncAction: PropTypes.func.isRequired,
    /**
     * redux function to set boolean if authenticated
     */
    authAction: PropTypes.func.isRequired,
    /**
     * page title
     */
    title: PropTypes.string,
    /**
     * global redux state boolean for showing loading progress top bar
     */
    loading: PropTypes.bool.isRequired,
    /**
     * redux function to set true or false the loading state
     * @param {boolean} loading
     */
    setLoading: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.loading = this.loading.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      isMobile: false
    };
  }
  async componentDidMount() {
    const {
      authAsyncAction,
      setLoading,
      setAsyncCurrentUserAction,
      authAction
    } = this.props;
    this.loading();
    const sessionToken = cookie.load("sessionToken");
    /**
     * waits for http request callback (true/false)
     */
    if (sessionToken) {
      await authAsyncAction(sessionToken);
    } else {
      await authAction(false);
    }
    if (!this.props.isAuthenticated) {
      if (Router.pathname !== '/' && Router.pathname !== '/register') {
        return Router.push("/");
      }
    }
    await setAsyncCurrentUserAction();
    console.log("current user: ", this.props.currentUser);
    const {
      currentUser: {
        w9_id,
        merchant_registration_id,
        corporation_certificate_id,
        roleid
      }
    } = this.props;
    if (Router.pathname !== "/dashboard/account/edit-account" && roleid === 3) {
      if (!w9_id || !merchant_registration_id || !corporation_certificate_id)
        toastr["warning"](
          `
        Debes subir tus documentos.
        ${" "}
        <a href="/dashboard/account/edit-account">Click aquí</a>
        ${" "}
        para subir tus archivos.
      `,
          "Perfil incompleto."
        );
    }
    if (this.props.currentUser.passwordchange === false)
      return Router.push("/dashboard/account/set-password");
    if (!verifyRoutePermision(Router.pathname, this.props.currentUser.roleid)) {
      console.warn("Redirecting user. No authorization.");
      Router.push("/dashboard");
    }
    if (window.innerWidth <= 575) this.setState({ isMobile: true });
    setLoading(false);
  }

  loading() {
    const { setLoading } = this.props;
    Router.onRouteChangeStart = url => {
      setLoading(true);
    };
    Router.onRouteChangeComplete = url => {
      setLoading(false);
    };
    Router.onRouteChangeError = (err, url) => {
      setLoading(false);
      if (err.cancelled) {
        console.log(`Route to ${url} was cancelled!`);
      }
    };
  }

  async logout() {
    await this.props.authAction(false);
    await cookie.remove("sessionToken", { path: "/" });
    Router.push("/");
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    const { title, children, loading, currentUser } = this.props;
    const { isMobile } = this.state;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/css/theme.min.css" />
          <link rel="stylesheet" href="/static/css/datepicker.css" />
          <link rel="stylesheet" href="/static/css/react-bootstrap-table-all.min.css" />
          <link rel="stylesheet" href="/static/css/global.css" />
        </Head>
        {loading &&
          <div className="progress primary-color-dark loading">
            <div className="indeterminate" />
          </div>}
        <header>
          <Navbar color="faded" light toggleable>
            <NavbarToggler right onClick={this.toggle} />
            <NavbarBrand href="/">Conwaste Subasta</NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {currentUser.roleid === 5 || currentUser.roleid === 6
                  ? <NavItem>
                      <Link href="/dashboard/admin">
                        <a className="nav-link">
                          Admin
                        </a>
                      </Link>
                    </NavItem>
                  : null}
                {currentUser.roleid === 4 || currentUser.roleid === 5
                  ? <NavItem>
                      <Link href="/dashboard/buy-request">
                        <a className="nav-link">
                          Requisición de compra
                        </a>
                      </Link>
                    </NavItem>
                  : null}
                {currentUser.roleid === 1 ||
                  currentUser.roleid === 5 ||
                  currentUser.roleid === 6
                  ? <NavItem>
                      <Link href="/dashboard/request-list">
                        <a className="nav-link">
                          Lista de requisiciones
                        </a>
                      </Link>
                    </NavItem>
                  : null}
                {currentUser.roleid === 2 ||
                  currentUser.roleid === 5 ||
                  currentUser.roleid === 6
                  ? <NavItem>
                      <Link href="/dashboard/applications">
                        <a className="nav-link">
                          Solicitudes
                        </a>
                      </Link>
                    </NavItem>
                  : null}
                {currentUser.roleid === 3 ||
                  currentUser.roleid === 5 ||
                  currentUser.roleid === 6
                  ? <NavItem>
                      <Link href="/dashboard/suppliers">
                        <a className="nav-link">
                          Subastas
                        </a>
                      </Link>
                    </NavItem>
                  : null}
                <NavItem>
                  <span className="nav-link" onClick={this.toggleDropdown}>
                    {/*fix visual bug for dropdown not showing when first time loading the page*/
                    }
                    {loading && <i className="fa fa-user-circle" />}
                    {!loading &&
                      <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggleDropdown}
                      >
                        <span
                          onClick={this.toggleDropdown}
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded={this.state.dropdownOpen}
                        >
                          <i className="fa fa-user-circle" />
                        </span>
                        <DropdownMenu right={isMobile === false}>
                          <DropdownItem header>Mi cuenta</DropdownItem>
                          <Link href="/dashboard/account/edit-account">
                            <a>
                              <DropdownItem className="waves-effect">
                                <i className="fa fa-edit" /> Editar perfil
                              </DropdownItem>
                            </a>
                          </Link>
                          <DropdownItem divider />
                          <DropdownItem
                            className="waves-effect"
                            onClick={this.logout}
                          >
                            <i className="fa fa-sign-out" />
                            {" "}Salir de{" "}
                            {currentUser.email}
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>}
                  </span>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </header>

        <EasyTransition
          path={"foo"}
          initialStyle={{ opacity: 0 }}
          transition="opacity 0.3s ease-in"
          finalStyle={{ opacity: 1 }}
          leaveStyle={{ opacity: 0 }}
        >
          {children}
        </EasyTransition>

        {/*<footer>*/}
        {/*This is the footer*/}
        {/*</footer>*/}
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
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...authActions, ...loadingActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
