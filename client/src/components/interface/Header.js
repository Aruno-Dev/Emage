import React, { Component } from 'react'

import AuthService from '../../services/auth.service'

import { Link } from 'react-router-dom'

class Header extends Component {
  state = {
    isOpen: false,
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser()

    if (user) {
      this.setState({
        currentUser: user
       
      })
    }
  }

  logOut() {
    AuthService.logout()
  }

  render() {
    const { currentUser } = this.state
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning scrolling-navbar">
          <Link className="navbar-brand" to="/">
            <strong>Emage</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/Home">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
             
             </ul>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      {currentUser.username}
                    </Link>
                  </li>
                  
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ):(
                <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
              )}
            
          
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

export default Header
