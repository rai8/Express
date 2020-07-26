const express = require("express")
const path = require("path")

const logger = require("./middleware/logger")
const app = express()

//creating a middleware

//initialize middleware
//app.use(logger)

//body parser middleware

app.use(express.json()) //to handle raw json
app.use(express.urlencoded({ extended: false }))

//setting a static folder
app.use(express.static(path.join(__dirname, "public")))

//members API routes
app.use("/api/members", require("./routes/api/members"))
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("server is running .....")
})
