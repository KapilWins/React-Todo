import React from "react";
import TodoItem from "./TodoItem";

const Todos = (props) => {
  const todosStyle = {
    minHeight: "70vh",
  };
  return (
    <div className="container my-3" style={todosStyle}>
      <h3 className="text-center">Todos List</h3>
      {!props.todos.length
        ? "No todo here"
        : props.todos.map((todo) => {
            return (
              <>
                <TodoItem todo={todo} onDelete={props.onDelete} />
                <hr />
              </>
            );
          })}
    </div>
  );
};

export default Todos;
