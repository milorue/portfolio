import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './pages/Admin'

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
        <Route path='/dashboard' component={Admin}/>
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
