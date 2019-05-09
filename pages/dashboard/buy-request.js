import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookie from "react-cookie";
import { initStore } from "../../store";
import BuyRequest from "../../containers/dashboard/buyRequest";
import * as regionsActions from "../../actions/regionsActions";
import { currentUser } from "../../api/auth";
class App extends React.Component {
  static async getInitialProps({ store, req }) {
    const isServer = !!req;
    if (isServer) {
      cookie.setRawCookie(req.headers.cookie);
    }
    const user = await currentUser();
    await store.dispatch(
      regionsActions.getAsyncRegionsAction(user.data[0].subscriberid)
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
        <BuyRequest />
      </Provider>
    );
  }
}

export default withRedux(initStore)(App);
