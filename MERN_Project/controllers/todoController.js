import TodoModel from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const todo = new TodoModel({ title, description });
    await todo.save();

    return res.status(201).json({
      success: true,
      message: "Todo created",
      todo,
    });
  } catch (error) {
    console.log("Error in createTodo", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
   // console.log(todos);
    return res.status(200).json({
      success : true,
      todos 
    });
  } catch (error) {
    console.log("Error in getAllTodos", error);
   return res.status(500).json({
      success : false,
      message : "Internal Server Error",
    });
  }
};
