import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookie from "react-cookie";
import { initStore } from "../../../store";
import EditAccount
  from "../../../containers/dashboard/account/editAccount/index";
import * as usersActions from "../../../actions/usersActions";
import { currentUser } from "../../../api/auth";
class App extends React.Component {
  static async getInitialProps({ store, req }) {
    const isServer = !!req;
    if (isServer) cookie.setRawCookie(req.headers.cookie);
    const user = await currentUser();
    await store.dispatch(
      usersActions.getAsyncSingleUserAction(user.data[0].id)
    );
    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.initialState, props.isServer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <EditAccount />
      </Provider>
    );
  }
}
export default withRedux(initStore)(App);
