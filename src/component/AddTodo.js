import React, { useState } from "react";
import { Drawer, Button, Box, TextField } from "@mui/material";
import "./app.css";

const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [order, setOrder] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false); // State for controlling the drawer visibility

  const submit = (e) => {
    e.preventDefault();
    if (!title || !desc || !order) {
      alert(
        `${!title ? "Title" : !desc ? "Description" : "Order"} can not be empty`
      );
    }

    if (title && desc && order) {
      props.addTodo({ title, desc, order });
      setTitle(""); // Reset form fields after submit
      setDesc("");
      setOrder("");
      setOpenDrawer(false); // Close the drawer after submission
    }
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer); // Toggle the drawer visibility
  };

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
          <h3>Add Todo</h3>
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
