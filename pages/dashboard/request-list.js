import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookie from "react-cookie";
import { currentUser } from "../../api/auth";
import { initStore } from "../../store";
import RequestList from "../../containers/dashboard/requestList";
import * as requestsActions from "../../actions/requestsActions";
import { checkAuth } from "../../api/auth";
class App extends React.Component {
  static async getInitialProps({ store, req }) {
    const isServer = !!req;
    if (isServer) {
      cookie.setRawCookie(req.headers.cookie);
    }
    const sessionToken = cookie.load("sessionToken");
    const isAuthenticated = await checkAuth(sessionToken);
    const user = await currentUser();
    const data = user.data[0];
    if (isAuthenticated) {
      if (data.roleid === 5) {
        await store.dispatch(
          requestsActions.getAsyncRequestsListAction(data.subscriberid)
        );
      } else {
        await store.dispatch(
          requestsActions.getAsyncRequestsListAction(
            data.subscriberid,
            undefined,
            undefined,
            data.id
          )
        );
      }
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
        <RequestList />
      </Provider>
    );
  }
}

export default withRedux(initStore)(App);
