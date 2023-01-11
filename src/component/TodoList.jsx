import React, { useState } from "react";
import "./todolist.css";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
const TodoList = () => {
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [addpopup, setAddPopup] = useState("hide");
  const [editpopup, setEditPopup] = useState("hide");
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [todoDone, setTodoDone] = useState(false);
  const currentDate = new Date()

  const [error, setError] = useState(false);
  // todos = [
  //   { id: 0, task: "Start making a presentation" },
  //   { id: 1, task: "Pay for rent" },
  // ];

  //Add todo Working---
  const addTask = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      setError(true);
    } else if (error) {
      setError(false);
    } else {
      setAddPopup("hide");
      const newTodo = {
        id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
        todo: inputValue,
        date: dateInput,
        time: timeInput,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      setDateInput("");
      setTimeInput("");
    }
  };
  //Getting Single todo working----
  const getSingleTodo = (id, todo, date, time) => {
    setEditId(id);
    setInputValue(todo);
    setDateInput(date);
    setTimeInput(time);
    setEditPopup("show");
  };
  //Edit todo Working---
  const editTodo = (e) => {
    e.preventDefault();
    setEditPopup("hide");
    const updatedTodo = [...todos];
    const taskIndex = updatedTodo.findIndex((item) => item.id === editId);
    updatedTodo[taskIndex].todo = inputValue;
    updatedTodo[taskIndex].date = dateInput;
    updatedTodo[taskIndex].time = timeInput;
    setTodos(updatedTodo);
    setInputValue("");
    setDateInput("");
    setTimeInput("");
  };
  //Delete Working----
  const deleteTask = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };
  //todo checked---
  const todoStatus = (id) => {
    // if (todos.filter((item) => item.id === id)) {
    //   setTodoDone(true);
    //   console.log(id);
    // } else setTodoDone(false);
  };
  return (
    <div className="todolist-main">
      <div className="todolist-header-main">
        <h1>Today</h1>
        <AiOutlinePlusCircle
          onClick={() => setAddPopup("show")}
          className="todolist_addIcon"
        />
      </div>
      <div className="todolist-list">
        {todos.length === 0 ? (
          <p className="todolist-list_no-todo">AdD ToDo</p>
        ) : (
          todos.map((item) => (
            <div key={item.id} className="todolist-list-item">
              <div className="todolist_todo_container">
                <input
                  onChange={() => todoStatus(item.id)}
                  type="checkbox"
                  className="todolist-checkbox"
                />
                <div className="todolist_todo">
                  {item.todo}
                  <div className="todolist_date-time">
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </div>
                </div>
              </div>
              <div className="todolist_btns">
                <div
                  className="todolist-edit-button"
                  onClick={() =>
                    getSingleTodo(item.id, item.todo, item.date, item.time)
                  }
                >
                  {" "}
                  <MdModeEdit />
                </div>
                <div
                  className="todolist-delete-button"
                  onClick={() => deleteTask(item.id)}
                >
                  <AiFillDelete />
                </div>
                {todoDone === true ? (
                  <div className="todolist-circle-green"></div>
                ) : (
                  <div
                    className={`${
                      item.date === currentDate
                        ? "todolist-circle-yellow"
                        : "" || item.date > currentDate
                        ? "todolist-circle-green"
                        : "" || item.date < currentDate
                        ? "todolist-circle-red"
                        : ""
                    }
                  }`}
                  ></div>
                )}
              </div>
            </div>
          ))
        )}
        {/*Add new popup */}
        {addpopup === "show" ? (
          <div className="todolist-popup">
            <div className="todolist-popup-content">
              <h2 className="todolist-popup_title">Add Todo</h2>
              <form onSubmit={addTask} className="todolist-popup_inputs">
                <input
                  className="todolist-popup_todoInput"
                  type="text"
                  id="addtask"
                  placeholder="Enter your todos"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setError(false);
                  }}
                />
                {error && (
                  <p className="todolist-popup_error">Please enter a todo.</p>
                )}

                <div className="todolist-popup_inputs_date-time">
                  <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => {
                      setDateInput(e.target.value);
                    }}
                  />
                  <input
                    type="time"
                    value={timeInput}
                    onChange={(e) => {
                      setTimeInput(e.target.value);
                    }}
                  />
                </div>
                <div className="todolist-cancel-done">
                  <button
                    onClick={() => setAddPopup("hide")}
                    className="todolist-popup_btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="todolist-popup_btn">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        {/*Edit popup*/}
        {editpopup === "show" ? (
          <div className="todolist-popup">
            <div className="todolist-popup-content">
              <h2 className="todolist-popup_title">Edit Todo</h2>
              <form onSubmit={editTodo} className="todolist-popup_inputs">
                <input
                  className="todolist-popup_todoInput"
                  type="text"
                  value={inputValue}
                  id="addtask"
                  placeholder="Enter your todos"
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="todolist-popup_inputs_date-time">
                  <input
                    type="date"
                    onChange={(e) => {
                      setDateInput(e.target.value);
                    }}
                    defaultValue={dateInput}
                  />
                  <input
                    type="time"
                    onChange={(e) => {
                      setTimeInput(e.target.value);
                    }}
                    defaultValue={timeInput}
                  />
                </div>
                <div className="todolist-cancel-done">
                  <button
                    onClick={() => setEditPopup("hide")}
                    className="todolist-popup_btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="todolist-popup_btn">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default TodoList;
