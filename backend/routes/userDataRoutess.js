const express = require("express");
const router = express.Router();
const userData = require("../models/userDataModel");

//CREATE
router.post("/", async (req, res) => {
  console.log(req.body);
  // const { name, email, age } = req.body;
  try {
    const userAdded = await userData.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
//GET
router.get("/", async (req, res) => {
  try {
    const allUsers = await userData.find();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//GET SINGLE USER
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await userData.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//UPDATE
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log("get body", req.body);
  console.log("get id", id);
  //const { name, email, age } = req.body;
  try {
    const updatedUser = await userData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




module.exports = router;