import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../../../store';
import Detail from '../../../../containers/dashboard/reports/subastas/detail';
class App extends React.Component {
  static getInitialProps({ store, req }) {
    const isServer = !!req;
    return { initialState: store.getState(), isServer }
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.initialState);
  }

  render() {
    return (
      <Provider store={this.store}>
        <Detail />
      </Provider>
    );
  }
}
export default withRedux(initStore)(App);
