import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import store from './store';
import App from './App/App';

import FHIR from 'fhirclient';
//http://localhost:3000/?launch=QH3qyX&iss=https://uat.csiro.au/fhirServer/fhir
const url = new URL(window.location.href);
if (url.searchParams.get("launch")) {
  // TODO - get our own client id
  FHIR.oauth2.authorize({
    "client_id": "case-authoring-tool",
    "scope": "openid launch system/Patient.* system/Observation.*"
  });
} else {
  ReactDOM.render(
    (
      <Provider store={store}>
        <App />
      </Provider>
    ), document.getElementById('root')); 
}