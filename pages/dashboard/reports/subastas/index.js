import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookie from "react-cookie";
import * as authActions from '../../../../actions/authActions';
import { initStore } from "../../../../store";
import Index from "../../../../containers/dashboard/reports/subastas";
class App extends React.Component {
  static async getInitialProps({ store, req }) {
    const isServer = !!req;
    if (isServer) {
      cookie.setRawCookie(req.headers.cookie);
    }
    await store.dispatch(authActions.setAsyncCurrentUserAction());
    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.initialState);
  }

  render() {
    return (
      <Provider store={this.store}>
        <Index />
      </Provider>
    );
  }
}
export default withRedux(initStore)(App);
