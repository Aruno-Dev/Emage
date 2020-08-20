import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Header from './components/interface/Header'
import Login from './components/users/Login'
import Error from './components/pages/Error'
import Register from './components/users/Register'
import Home from './components/Home'
import Profile from './components/users/Profile'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Home" component={Home} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
