import axios from 'axios'

const API_URL = 'http://localhost:8080/api/image/'

class ImageService {
  getAll() {
    return axios
      .get(API_URL + 'list')
   
  }

  getById(userId) {
    return axios
    .get(`${API_URL}list/user/${userId}`)

  }
}

export default new ImageService()
