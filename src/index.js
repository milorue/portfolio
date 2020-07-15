import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Route, BrowserRouter, Switch} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: "http://milorue.herokuapp.com/"
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);
