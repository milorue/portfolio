import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './pages/Admin'

import {Route, BrowserRouter} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: "https://milorue.herokuapp.com/"
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter basename={'/'} useHistory>
        <Route exact path='/' component={() => <App/>}/>
        <Route path='/dashboard' component={() => <Admin/>}/>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
