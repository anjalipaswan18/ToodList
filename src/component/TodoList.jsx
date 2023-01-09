import React, { useState } from "react";
import "./todolist.css";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoItems from "../Data/TodoItems";
console.log(TodoItems);
const TodoList = () => {
  const [popup, setPopup] = useState("hide");
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState(TodoItems);
  const [editMode, setEditMode] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    setPopup("hide");
    if (editMode) {
      const taskToEdit = task.find((task) => task.id === taskId);
      taskToEdit.task = inputValue;
      setTask([...task]);
      setEditMode(false);
      setTaskId(null);
    } else {
      const newTask = {
        id: TodoItems[TodoItems.length - 1].id + 1,
        task: inputValue,
      };
      setTask([...task, newTask]);
    }
    setInputValue("");
  };
  const editTask = (taskId) => {
    const taskToEdit = task.find((task) => task.id === taskId);

    setInputValue(taskToEdit.task);
    setPopup("show");

    setEditMode(true);

    setTaskId(taskId);
  };
  const deleteTask = (taskId) => {
    const updatedTasks = task.filter((task) => task.id !== taskId);
    setTask(updatedTasks);
  };

  // const AddedTask=()=>{
  //     setTask([...Items]+addedtask)
  // }
  return (
    <div className="todolist-main">
      <div className="todolist-header-main">
        <h1>Today</h1>
        <AiOutlinePlusCircle
          onClick={() => setPopup("show")}
          className="todolist_addIcon"
        />
      </div>
      <div className="todolist-list">
        {task.map((item) => (
          <div key={item.id} className="todolist-list-item">
            <div className="todolist_todo_container">
              <input type="checkbox" className="todolist-checkbox" />
              <div className="todolist_todo">{item.task || task}</div>
            </div>
            <div className="todolist_btns">
              <div
                className="todolist-edit-button"
                onClick={() => editTask(item.id)}
              >
                <MdModeEdit />
              </div>

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
