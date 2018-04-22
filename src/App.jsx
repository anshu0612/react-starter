import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'

import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { Provider } from 'react-redux'
import { store } from './store'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const Home = () => <div>Welcome Home Girl!</div>

export const App = () =>
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  </Provider>
