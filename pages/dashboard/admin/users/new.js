import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookie from "react-cookie";
import { initStore } from "../../../../store";
import New from "../../../../containers/dashboard/admin/users/new";
import * as authActions from "../../../../actions/authActions";
import { currentUser } from "../../../../api/auth";
class App extends React.Component {
  static async getInitialProps({ store, req }) {
    const isServer = !!req;
    if (isServer) cookie.setRawCookie(req.headers.cookie);
    const user = await currentUser();
    const data = user.data[0];
    await store.dispatch(authActions.setCurrentUserAction(data));
    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.initialState);
  }

  render() {
    return (
      <Provider store={this.store}>
        <New />
      </Provider>
    );
  }
}
export default withRedux(initStore)(App);
