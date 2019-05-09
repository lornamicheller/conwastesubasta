import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '!/store';
import { authenticate } from '!/api/auth';
import New from '!/containers/dashboard/admin/projects/new';
class App extends React.Component {
  static async getInitialProps({ store, req, res }) {
    const isServer = !!req;
    await authenticate(store, isServer, req, res);
    return { initialState: store.getState(), isServer }
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
