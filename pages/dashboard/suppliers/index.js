import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookie from "react-cookie";
import { checkAuth, currentUser } from "../../../api/auth";
import * as requestsActions from "../../../actions/requestsActions";
import { initStore } from "../../../store";
import AppList from "../../../containers/dashboard/suppliers/appList";
class App extends React.Component {
  static async getInitialProps({ store, req }) {
    const isServer = !!req;
    if (isServer) cookie.setRawCookie(req.headers.cookie);
    const sessionToken = cookie.load("sessionToken");
    const isAuthenticated = await checkAuth(sessionToken);
    const user = await currentUser();
    if (isAuthenticated) {
      await store.dispatch(
        requestsActions.getAsyncSupplierRequests(user.data[0].id)
      );
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
        <AppList />
      </Provider>
    );
  }
}
export default withRedux(initStore)(App);
