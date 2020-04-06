import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import rootReducer from './rootReducer';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch} from 'react-router-dom';
import {AUTH_TOKEN, AUTH_USER} from './Reducers/auth/types';
import 'bootstrap/dist/js/bootstrap'; // for responsive navbar dropdown and modal dialog
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/dropzone/dist/min/dropzone.min.css';
import './lib/css/ADMStyle.css';
import './lib/css/skins/skin-blue.css';
import './index.css';
import './lib/css/style.css';
import 'react-dates/lib/css/_datepicker.css';

const store = createStore(rootReducer, applyMiddleware(thunk));
const token = jwt.decode(localStorage.getItem('token'));
// update application state with token information if needed
if (token) {
  store.dispatch({type: AUTH_TOKEN, token: token});
  store.dispatch({type: AUTH_USER});
}
ReactDOM.render(<BrowserRouter>
  <Provider store={store}>
    <Switch>
      <App/>
    </Switch>
  </Provider>
</BrowserRouter>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
