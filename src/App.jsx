import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'

import { Login } from './components/Login'
import { Profile } from './components/Profile'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const Home = () => <div>Welcome Home Girl!</div>

export const App = () => <Router history={history}>
  <div>Router</div>
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/profile' component={Profile} />
    <Route path='/' component={Home} />
  </Switch>
</Router>
