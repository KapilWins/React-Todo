import React, { Suspense, useEffect } from "react";
import Header from "./component/Header";
import Todos from "./component/Todos";
import Footer from "./component/Footer";
import AddTodo from "./component/AddTodo";
import { useState } from "react";
import { routes } from "./routes";
import { useRoutes } from "react-router-dom";
import "./component/app.css";

const App = () => {
  let initTodos;
  if (!localStorage.getItem("todos")) {
    initTodos = [];
  } else {
    initTodos = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    setTodos(todos.filter((x) => x !== todo));
  };

  const addTodo = async (todo) => {
    const id = "id" + Math.random().toString(16).slice(2);
    const newTodo = {
      id,
      title: todo.title,
      description: todo.desc,
      order: todo.order,
    };

    setTodos([...todos, newTodo]);
  };

  const [todos, setTodos] = useState(initTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const elements = useRoutes(routes);
  return (
    <>
      <Suspense>{elements}</Suspense>
      <Header title="TODO LIST" />
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
      <Footer />
    </>
  );
};

export default App;
