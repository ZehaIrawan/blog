const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo");

// @route    GET api/todos
// @desc     Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/todos
// @desc     Create a todo
router.post("/", async (req, res) => {
  console.log(req.body,'req');
  const { title, description } = req.body;
  try {
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/todos/:id
// @desc     Update a todo
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/todos/:id
// @desc     Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Todo deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
