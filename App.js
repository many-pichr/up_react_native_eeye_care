// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppContainer from './src/AppContainer';

class App extends Component<any> {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
export default App;