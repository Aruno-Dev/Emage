import React, { Component } from 'react'

import UserService from '../services/user.service'
import { Link, generatePath } from 'react-router-dom'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      images: [],
      error: null,
      isLoaded: false,
    }
  }

  componentDidMount() {
    UserService.getPublicContent()
      .then(
        (response) => {
          this.setState({
            content: response.data,
          })
        },
        (error) => {
          this.setState({
            content:
              (error.response && error.response.data) ||
              error.message ||
              error.toString(),
          })
        },
      )
      .then(
        fetch('http://localhost:8080/api/image/list')
          .then((res) => res.json())
          .then(
            (result) => {
              this.setState({
                images: result,
                isLoaded: true,
              })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              })
            },
          ),
      )
  }

  render() {
    const { error, isLoaded } = this.state

    if (error) {
      return <div>Erreur : {error.message}</div>
    } else if (!isLoaded) {
      return <div>Chargement…</div>
    } else {
      return (
        <div className="container">
          <h1>
            WELCOME TO Emage - The best image managerrrrrrrrrrrrrrrrrrrrrr !
          </h1>
          <p>
            Not a member ?<Link to="/Register"> Sign Up</Link>
          </p>
          <p>
            Member <Link to="/Login">Login</Link>
          </p>
          <div className="container">
            <h2 className="text-center">Last uploaded</h2>

            <ul>
              {this.state.images.map((image) => (
                <img
                  style={{ width: '200px', height: 'auto' }}
                  key={image.id}
                  src={
                    generatePath('../../resources/static/assets/uploads/') +
                    'Emage-' +
                    image.name
                  }
                  alt="img"
                  className="img-thumbnail"
                ></img>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }
}
