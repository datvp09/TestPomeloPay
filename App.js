import React from 'react';
import {StatusBar} from 'react-native';
import Home from './src/screens/Home';
import {store} from './redux/configStore';
import {Provider} from 'react-redux';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#1365AF'} />
        <Home />
      </Provider>
    );
  }
}
