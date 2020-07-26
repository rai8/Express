const express = require("express")
const path = require("path")
const members = require("./Members")
const app = express()

//creating a middleware

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`)
  next()
}

//initialize middleware
app.use(logger)
//creating a simple rest api--- gets all members
app.get("/api/members", (req, res) => res.json(members))

//setting a static folder
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("server is running .....")
})
