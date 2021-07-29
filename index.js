/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Root from './src/Root'
import {name as appName} from './app.json';
// import { Provider } from 'react-redux';
// import configureStore from './src/Services/store/configureStore';
// const store = configureStore();

// const RNRedux = () => (
//   <Provider store = { store }>
//     <Root />
//   </Provider>
// )

AppRegistry.registerComponent(appName, () => Root);


// import { AppRegistry } from 'react-native';
// import React from 'react';
// import App from './App';
// import { name as appName } from './app.json';
// import { Provider } from 'react-redux';

// import configureStore from './store';

// const store = configureStore()

// const RNRedux = () => (
//   <Provider store = { store }>
//     <App />
//   </Provider>
// )

// AppRegistry.registerComponent(appName, () => RNRedux);
