import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Route, BrowserRouter, Switch} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: "http://localhost:4000/"
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter basename={'/'} useHistory>
      <Switch>
        <Route exact patch='/' component={App}/>
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
