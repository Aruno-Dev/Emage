import React from 'react'
import { generatePath } from 'react-router-dom'
import AuthService from '../../services/auth.service'
import ImageService from '../../services/image.service'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      userId: AuthService.getCurrentUser().id,
      error: null,
      isLoaded: false,
    }
  }

  componentDidMount() {
    ImageService.getById(this.state.userId)
      .then((res) => res.json())
      .then(
        (results) => {
          console.log(results.data)
          this.setState({
            isLoaded: true,
            images: results.data,
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        },
      )
  }

  render() {
    const { error, isLoaded, images } = this.state

    if (error) {
      return <div>Erreur : {error.message}</div>
    } else if (!isLoaded) {
      return <div>Chargement…</div>
    } else {
      return (
        <React.Fragment>
          <div className="container">
            <h1 className="display-4 my-4 ">Your Image List {}</h1>
            <ul>
              {images.map((image) => (
                <img
                  key={image.id}
                  src={
                    generatePath('../../resources/static/assets/uploads/') +
                    'Emage-' +
                    image.name
                  }
                  alt="img"
                ></img>
              ))}
            </ul>
          </div>
        </React.Fragment>
      )
    }
  }
}
