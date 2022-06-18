import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTodo = ({ allTasks, UpdateMsg }) => {
  const { id } = useParams();
  let history = useNavigate();
  let [targetTask, setTargetTask] =  useState(null);


  if (allTasks && !targetTask) {
    targetTask = allTasks.filter((task) => task.id === +id)[0];
  }
  const updateTaskObject = (e) => {
    const { name, value } = e.target;
    setTargetTask(() => ({
      ...targetTask,
      [name]: value,
    }));
  };

  const handleFormSubmition = (e) => {
    e.preventDefault();
    //check for missing inputs
    updateTask(targetTask);
  };
  const updateTask = (targetTask) => {
    axios
      .put(`http://127.0.0.1:8000/api/todos/${id}`, targetTask)
      .then((res) => {
        UpdateMsg(res);
      })
      .catch((error) => {
        UpdateMsg(error.response);
      });
  };
  useEffect(() => {}, []);

  return (
    <div className=" col-8 offset-2 bg-primary mt-4 p-2">
      <p className="font-italic text-white mb-1 font-weight-bolder">
        Edit Task No. {id} :
      </p>
      {targetTask ? (
        <form className=" col-8" onSubmit={handleFormSubmition}>
          <div className="col-9 offset-2 input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Name:
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              onChange={updateTaskObject}
              value={targetTask?.name || ""}
               
            />
          </div>
          <div className="col-9 offset-2 input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                description:
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              name="description"
              value={targetTask?.description || ""}
              onChange={updateTaskObject}
               
            />
          </div>
          <div className="col-9 offset-2  input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Status
              </span>
            </div>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={updateTaskObject}
              name="status"
               
              value={targetTask.status}
            >
              <option defaultValue value="">
                pls select a status
              </option>
              <option value="done">done</option>
              <option value="not-yet">not yet</option>
            </select>
          </div>
          <div className="col-9 offset-2  input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                creator
              </span>
            </div>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={updateTaskObject}
              name="user_id"
               
              value={targetTask.creator?.id}
            >
              <option defaultValue value="">
                pls select a user
              </option>
              <option value="1">yaya</option>
            </select>
          </div>
          <button className="w-75 offset-4 btn btn-sm btn-success">Add</button>
        </form>
      ) : (
        <div className=" col-8 offset-2 card bg-danger">
          <div className="card-header bg-info text-white">ERROR</div>
          <div className="card-body">
            <h5 className="card-title text-white">sth went wrong</h5>
            <p className="card-text text-white">no task Selected to show ...</p>
            <button
              className="btn btn-warning"
              onClick={() => history.goBack()}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodo;
