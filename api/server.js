const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()





var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
//app.use('/uploads', express.static('uploads'));
// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./src/models");
const Role = db.role;

db.sequelize.sync()
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
//   Role.create({
//     id: 2,
//     name: "admin"
//   });
// }

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Emage application." })
})

// routes
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/image.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})