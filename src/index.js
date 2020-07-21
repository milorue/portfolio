import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Route, BrowserRouter, Switch} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: "https://milorue.herokuapp.com/"
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter basename={'/'} useHistory>
      <Switch>
        <Route exact path='/' component={App}/>
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
