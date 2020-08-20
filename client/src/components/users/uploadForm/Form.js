import React from 'react'
import AuthService from '../../../services/auth.service'
import Axios from 'axios'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      title: '',
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
    this.changeText = this.changeText.bind(this)
    this.file = React.createRef()
   
  }
  changeTitle(e) {
    e.preventDefault()
      this.setState({
          title: e.target.value,
          
      })
  }
  changeText(e) {
    e.preventDefault()
this.setState({
    text: e.target.value
})
  }

  handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', this.state.title)
    formData.append('text', this.state.text)
    formData.append('file', this.file.current.files[0])
    formData.append('userId', AuthService.getCurrentUser().id)
    console.log(this.file.current.files[0])
    Axios.post('http://localhost:8080/api/image/upload', formData)
      .then((res) => {
       
        alert('File Upload success')
      })
      .catch((err) => alert('File Upload Error'))
  }

  showForm = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  render() {
    return (
      <div className="container">
        <button className="btn btn-primary shadow" onClick={this.showForm}>
          {this.state.show ? 'cancel' : 'add new'}
        </button>
        {this.state.show ? (
          <form enctype="multipart/form-data" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="imageTitleInput">Title</label>
                <input
                  type="text"
                value={this.state.title}
                  name="title"
                  className="form-control"
                  placeholder="Image title"
                  onChange={this.changeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageDescriptionInput">Description</label>
                <textarea
                  type="text"
                  name="text"
                  className="form-control"
                  value={this.state.text}
                  rows="3"
                  cols="30"
                  placeholder="Image description"
                  onChange={this.changeText}
                />
              </div>
              <input
                type="file"
                ref={this.file}
                name="file"
                className="form-control"
              />
              <small id="extensionHelp" className="form-text text-muted">
                .jpg/.png only
              </small>
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : null}
      </div>
    )
  }
}
