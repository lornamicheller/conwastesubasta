import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookies from "react-cookie";
import { initStore } from "../../store";
import Index from "../../containers/dashboard/index";
import * as requestsActions from "../../actions/requestsActions";
import * as authActions from "../../actions/authActions";
import { currentUser } from "../../api/auth";
class App extends React.Component {
  static async getInitialProps({ store, req }) {
    const isServer = !!req;
    if (isServer) {
      cookies.setRawCookie(req.headers.cookie);
    }
    try {
      const user = await currentUser();
      const data = user.data[0];
      await store.dispatch(authActions.setCurrentUserAction(data));
      if (data.roleid === 5) {
        await store.dispatch(
          requestsActions.getAsyncRequestsListAction(data.subscriberid)
        );
      } else if (data.roleid === 1) {
        await store.dispatch(
          requestsActions.getAsyncRequestsListAction(
            data.subscriberid,
            data.regionid,
            undefined,
            data.id
          )
        );
      } else if (data.roleid === 2) {
        await store.dispatch(
          requestsActions.getAsyncRequestsListAction(
            data.subscriberid,
            data.regionid
          )
        );
      }
    } catch (err) {
      console.error("Error: ", err);
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
        <Index />
      </Provider>
    );
  }
}

export default withRedux(initStore)(App);
