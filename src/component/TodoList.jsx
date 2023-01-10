import React, { useState } from "react";
import "./todolist.css";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoItems from "../Data/TodoItems";
const TodoList = () => {
  const [popup, setPopup] = useState("hide");
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState(TodoItems);
  const [editId, setEditId] = useState(-1);

  console.log(task);
  const submit = (e) => {
    e.preventDefault();
    setPopup("hide");
    if (editId !== -1) {
      const updatedTasks = [...task];
      const taskIndex = updatedTasks.findIndex((task) => task.id === editId);
      updatedTasks[taskIndex].task = inputValue;
      setTask(updatedTasks);
      console.log(updatedTasks);
    } else {
      const newTask = {
        id: task.length,
        task: inputValue,
      };
      console.log(task);
      setTask([...task, newTask]);
    }
    setInputValue("");
    setEditId(-1);
  };
  const deleteTask = (taskId) => {
    const updatedTasks = task.filter((task) => task.id !== taskId);
    setTask(updatedTasks);
  };
  const editTask = (taskId, taskValue) => {
    setEditId(taskId);
    setInputValue(taskValue);
    setPopup("show");
  };

  // const submit = (e) => {
  //   e.preventDefault();
  //   setPopup("hide");
  //   const newTask = {
  //     id: task.length,
  //     task: inputValue,
  //   };
  //   setTask([...task, newTask]);
  //   setInputValue("");
  // };
  // const deleteTask = (taskId) => {
  //   const updatedTasks = task.filter((task) => task.id !== taskId);
  //   setTask(updatedTasks);
  // };

  return (
    <div className="todolist-main">
      <div className="todolist-header-main">
        <h1>Today</h1>
        <AiOutlinePlusCircle
          onClick={() => {
            setPopup("show");
            setEditId(-1);
          }}
          //   onClick={() => setPopup("show")
          // }
          className="todolist_addIcon"
        />
      </div>
      <div className="todolist-list">
        {task.map((item) => (
          <div key={item.id} className="todolist-list-item">
            <div className="todolist_todo_container">
              <input type="checkbox" className="todolist-checkbox" />
              <div className="todolist_todo">
                {item.task || task} {item.id}
              </div>
            </div>
            <div className="todolist_btns">
              <div
                className="todolist-edit-button"
                onClick={() => editTask(item.id, item.task)}
              >
                <MdModeEdit />
              </div>
              {/* <div
                className="todolist-edit-button"
                // onClick={(e) => editTask(e)}
              >
                <MdModeEdit />
              </div> */}
              <div
                className="todolist-delete-button"
                onClick={() => deleteTask(item.id)}
              >
                <AiFillDelete />
              </div>

              <div className="todolist-circle"></div>
            </div>
          </div>
        ))}

        {/* popup */}
        {popup === "show" ? (
          <div className="todolist-popup">
            <div className="todolist-popup-content">
              <h2 className="todolist-popup_title">Add Todo</h2>
              <form onSubmit={submit} className="todolist-popup_inputs">
                <input
                  className="todolist-popup_todoInput"
                  type="text"
                  value={inputValue}
                  id="addtask"
                  placeholder="Enter your task"
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="todolist-popup_inputs_date-time">
                  <input type="date" id="adddate" />
                  <input type="time" id="addtime" />
                </div>
                <div className="todolist-cancel-done">
                  <button
                    onClick={() => setPopup("hide")}
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
