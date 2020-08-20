import React, { Component } from 'react'
import AuthService from '../../services/auth.service'
import Form from './uploadForm/Form'
import List from '../image/List'

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    }
  }

  render() {
    const { currentUser } = this.state

    return (
      <div className="container">
        <h1>
          <strong>{currentUser.username}'s</strong> Profile
        </h1>

        <Form />
        <div className="container my-3 text-center">
          <List />
        </div>
      </div>
    )
  }
}
