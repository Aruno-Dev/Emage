const fs = require('fs')
const db = require('../models')
const uploadConfig = require('../config/upload.config')

const Image = db.images
const Op = db.Sequelize.Op

exports.add = (req, res) => {
  try {
    console.log(req.file)

    if (req.file == undefined) {
      return res.send(`You must select a file.`)
    }
    const filename = req.file.originalname.replace(/ /g, '')
    Image.create({
      title: req.body.title,
      text: req.body.text,
      type: req.file.mimetype,
      name: filename,
      data: fs.readFileSync(
        uploadConfig.projectDir +
          'client/src/resources/static/assets/uploads/' +
          'Emage-' +
          filename,
      ),
      userId: req.body.userId,
    }).then((image) => {
      fs.writeFileSync(
        uploadConfig.projectDir +
          'client/src/resources/static/assets/tmp/' +
          filename,
        image.data,
      )

      return res.send(`File has been uploaded.`)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying upload images: ${error}`)
  }
}

// Retrieve all images from the database.
exports.findAll = (req, res) => {
  Image.findAll()
    .then((image) => {
      image.forEach((img) => {
        console.log('id : ' + img.id + '\n')
        console.log('title : ' + img.title + '\n')
        console.log('text : ' + img.text + '\n')
        console.log('name : ' + img.name + '\n')
        console.log('imgUserId : ' + img.userId + '\n')
      })

      res.send(image)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving images.',
      })
      console.log(message)
    })
}
// Retrieve all images with userId from the database.
exports.findAllByUserId = (req, res) => {
  Image.findAll({ where: { userId: { [Op.eq]: req.params.id } } })
    .then((image) => {
      image.forEach((img) => {
        console.log('req params : ' + req.params.id)
        console.log('id : ' + img.id + '\n')
        console.log('title : ' + img.title + '\n')
        console.log('text : ' + img.text + '\n')
        console.log('name : ' + img.name + '\n')
        console.log('img userId : ' + img.userId + '\n')
        console.log("img : "+ img)
      })

      res.send(image)
      
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving images.',
      })
      console.log(message)
    })
}
// Delete one image from the database.
exports.delete = (req, res) => {
  const id = req.params.id

  Image.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Image was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete image with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete image with id=' + id,
      })
    })
}
