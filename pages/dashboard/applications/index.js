import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookie from "react-cookie";
import { currentUser } from "../../../api/auth";
import { initStore } from "../../../store";
import Applications from "../../../containers/dashboard/applications";
import * as requestsActions from "../../../actions/requestsActions";
import { checkAuth } from "../../../api/auth";
class App extends React.Component {
  static async getInitialProps({ store, req }) {
    const isServer = !!req;
    if (isServer) {
      cookie.setRawCookie(req.headers.cookie);
    }
    const sessionToken = cookie.load("sessionToken");
    const isAuthenticated = await checkAuth(sessionToken);
    const user = await currentUser();
    if (isAuthenticated) {
      await store.dispatch(
        requestsActions.getAsyncRequestsListAction(
          user.data[0].subscriberid,
          user.data[0].regionid,
          2
        )
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
        <Applications />
      </Provider>
    );
  }
}
export default withRedux(initStore)(App);
