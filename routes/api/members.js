const express = require("express")
const router = express.Router()
const members = require("../../Members")

//creating a simple rest api--- gets all members
router.get("/", (req, res) => res.json(members))

//getting a single member from our API
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id))

  found
    ? res.json(
        members.filter((member) => member.id === parseInt(req.params.id))
      )
    : res.status(400).json({ msg: `No member with id of ${req.params.id}` })
})

module.exports = router
