const express = require("express")
const router = express.Router()
const members = require("../../Members")
const uuid = require("uuid")

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

//creating a member--- used to update the database POST request
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  }
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" })
  }
  members.push(newMember)
  /* res.json(members) */
  res.redirect("/")
})

//update a member-- this is going to be a put request

router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id))

  if (found) {
    const updateMember = req.body
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name
        member.email = updateMember.email ? updateMember.email : member.email

        res.json({ msg: "Member has been update successfully", member })
      }
    })
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` })
  }
})

//delete a member --- this is going to be a delete request

router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id))

  found
    ? res.json({
        msg: "Member deleted successfully",
        members: members.filter(
          (member) => member.id !== parseInt(req.params.id)
        ),
      })
    : res.status(400).json({ msg: `No member with id of ${req.params.id}` })
})

module.exports = router
