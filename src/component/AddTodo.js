import React, { useEffect, useState } from "react";
import { Drawer, Button, Box, TextField } from "@mui/material";
import "./app.css";
import Todos from "./TodoDetails";
import { validateTodo } from "./TodoSchema";

const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [order, setOrder] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false); // State for controlling the drawer visibility
  const [editTodo, setEditTodo] = useState(null); // State to hold the todo being edited

  // Retrieve todos from localStorage or use an empty array as default
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  // State to hold errors for each field
  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    order: "",
  });
  const submit = (e) => {
    e.preventDefault();
    // Perform Joi validation before proceeding
    const validationResult = validateTodo({ title, desc, order });
    if (validationResult.error) {
      const errorMessages = {};
      validationResult.error.details.forEach((err) => {
        errorMessages[err.path[0]] = err.message; // Store error message by field
      });
      setErrors(errorMessages); // Set the errors state
    } else {
      setErrors(""); // Clear error if validation passes
      if (editTodo) {
        // Update existing todo
        const updatedTodos = todos.map((todo) => {
          debugger;
          return todo.id === editTodo.id
            ? { ...todo, title, description: desc, order }
            : todo;
        });
        setTodos(updatedTodos);
      } else {
        // Add new todo
        addTodo({ title, desc, order });
      }
      setTitle(""); // Reset form fields after submit
      setDesc("");
      setOrder("");
      setOpenDrawer(false); // Close the drawer after submission
    }
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
    if (openDrawer) {
      // Reset form data when closing the drawer
      setTitle("");
      setDesc("");
      setOrder("");
      setEditTodo(null); // Clear the editing todo
    }
  };

  const onDelete = (todo) => {
    setTodos(todos.filter((x) => x !== todo));
  };

  // This function will handle the Edit button click
  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDesc(todo.description);
    setOrder(todo.order);
    setEditTodo(todo); // Set the todo for editing
    setOpenDrawer(true); // Open the drawer
  };

  const addTodo = async (todo) => {
    const id = "id" + Math.random().toString(16).slice(2);
    const newTodo = {
      id,
      title: todo.title,
      description: todo.desc,
      order: todo.order,
    };

    // Append new todo to the existing todos list
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  };

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ float: "right", margin: "20px" }}
        onClick={toggleDrawer}
      >
        Add Todo
      </Button>
      <Todos todos={todos} onDelete={onDelete} onEdit={handleEdit} />
      {/* Drawer Component */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "500px", // Width of the drawer
            padding: "20px", // Padding for the content inside the drawer
            backgroundColor: "#f7f7f7", // Background color of the drawer
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
            borderRadius: "8px 0 0 8px", // Rounded corners
          },
        }}
      >
        <Box sx={{ width: 250, padding: 2 }}>
          <h3>{editTodo ? "Edit Todo" : "Add Todo"}</h3>

          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <TextField
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                id="title"
                fullWidth
                sx={{ marginBottom: 2 }}
                error={Boolean(errors.title)} // Show error if there's an error for title
                helperText={errors.title} // Show the error message under the title field
              />
            </div>

            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Description
              </label>
              <TextField
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="form-control"
                id="desc"
                fullWidth
                sx={{ marginBottom: 2 }}
                error={Boolean(errors.desc)} // Show error if there's an error for title
                helperText={errors.desc} // Show the error message under the title field
              />
            </div>

            <div className="mb-3">
              <label htmlFor="order" className="form-label">
                Order
              </label>
              <TextField
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="form-control"
                id="order"
                fullWidth
                sx={{ marginBottom: 2 }}
                error={Boolean(errors.order)} // Show error if there's an error for title
                helperText={errors.order} // Show the error message under the title field
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Drawer>
    </div>
  );
};

export default AddTodo;
