import React from "react";
import { FaEdit } from "react-icons/fa"; // Importing the edit icon from react-icons

const TodoItem = ({ todo, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => {
            onDelete(todo);
          }}
        >
          Delete
        </button>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => {
            onEdit(todo);
          }}
        >
          <FaEdit /> {/* Using the FaEdit icon for editing */}
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
