const express = require("express")
const path = require("path")
const exphbs = require("express-handlebars")
const logger = require("./middleware/logger")
const app = express()
const members = require("./Members")
//creating a middleware

//initialize middleware
//app.use(logger)

//Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

//home page route

app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
)

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
