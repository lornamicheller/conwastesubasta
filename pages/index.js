import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookie from "react-cookie";
import { initStore } from "../store";
import * as authActions from "../actions/authActions";
import Login from "../containers/login";
/**
 * Component to show the home container.
 */
class App extends React.Component {
  static async getInitialProps({ store, req }) {
    const isServer = !!req;
    if (isServer) {
      cookie.setRawCookie(req.headers.cookie);
    }
    if (cookie.load("sessionToken", undefined, { path: "/" })) {
      await store.dispatch(
        authActions.authAsyncAction(cookie.load("sessionToken"))
      );
    } else {
      await store.dispatch(authActions.authAction(false));
    }
    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.initialState, props.isServer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <Login />
      </Provider>
    );
  }
}

export default withRedux(initStore)(App);
