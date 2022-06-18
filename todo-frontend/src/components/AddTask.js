import React from "react";
import { useEffect, useState } from "react";
import useAxios from "../customHooks/useAxios.js";

const AddTask = ({childMsg}) => {
  const [taskToAdd, SetTaskToAdd] = useState({
    name: null,
    description: null,
    status: null,
  });
  const [obToSend, SetObToSend] = useState(null);
  const [formErrors, setFormErrors] = useState(false);
  let missingInputs = [];
  let [errMsg, setErrMsg] = useState();

  const updateTaskObject = (e) => {
    const { name, value } = e.target;
    SetTaskToAdd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, isPending, error } = useAxios(
    "POST",
    "http://127.0.0.1:8000/api/todos",
    obToSend
  );
  
  const handleFormSubmition = (e) => {
    e.preventDefault();
    //check for missing inputs
    for (let attr in taskToAdd)
      if (!taskToAdd[attr]) {
        missingInputs.push(attr);
        setFormErrors(true);
      }
    //if no missing data
    if (missingInputs.length <= 0) {
      setFormErrors(false);
      console.log(taskToAdd);
      SetObToSend(taskToAdd);
      //reset obj& the form
      SetTaskToAdd({
        name: null,
        description: null,
        status: null,
      });
      e.target.reset();
      //call back-end with post
    } else {
      //if errors print it to the user
      setErrMsg(missingInputs.join("-"));
    }
  };

  useEffect(() => {
    childMsg(data, error.message);
  }, [data, isPending, error, childMsg]);
  return (
    <div className=" col-8 offset-2 bg-info mt-4 p-2">
      <p className="font-italic text-white mb-1 font-weight-bolder">
        Adding New Task :
      </p>
      {formErrors && (
        <h6 className=" text-danger col-5 offset-3" role="alert">
          we'r sry , pls add data first!
          <br />
          <small> {`${errMsg} appears to be missing `}</small>
        </h6>
      )}
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
            value={taskToAdd?.name || ""}
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
            value={taskToAdd?.description || ""}
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
          >
            <option defaultValue value="">
              plsselect a status
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
          >
            <option defaultValue value="">
              plsselect a user
            </option>
            <option value="1">yaya</option>
          </select>
        </div>
        <button className="w-75 offset-4 btn btn-sm btn-success">Add</button>
      </form>
    </div>
  );
};

export default AddTask;
