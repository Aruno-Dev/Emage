const controller = require('../controllers/image.controller.js')

const upload = require('../middlewares/upload')

module.exports = (app) => {

  // Retrieve all image
  app.get('/api/image/list', controller.findAll)

  //Retrieve all image by id
  app.get('/api/image/list/user/:id', controller.findAllByUserId)

  // Add a new image
  app.post('/api/image/upload', upload.single('file'), controller.add)

  // Delete an image with id
  app.delete('/api/image/delete/:id', controller.delete)
}
