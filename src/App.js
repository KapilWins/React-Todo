import React from "react";
import Header from "./component/Header";
import AddTodo from "./component/AddTodo";
import { Route, Routes } from "react-router-dom";
import "./component/app.css";
import About from "./component/About";

const App = () => {
  return (
    <>
      <Header title="TODO LIST" />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/TodoDetails" element={<AddTodo />} />
      </Routes>
      {/* <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
      <Footer /> */}
    </>
  );
};

export default App;
