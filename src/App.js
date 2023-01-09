import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Popup from "./component/Popup";
import TodoList from "./component/TodoList";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <TodoList />
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
