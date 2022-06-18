import React from 'react'

const AddTask = ({ addTask }) => {
  return (
    <div className=" col-8 offset-2 bg-info mt-4 p-2">
      <p className="font-italic text-white mb-1 font-weight-bolder">
        Adding New Task :
      </p>
      <form className=" col-8">
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
          />
        </div>
        <div className="col-9 offset-2  input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Status
            </span>
          </div>
          <select className="form-select" aria-label="Default select example">
            <option value="done">done</option>
            <option value="not-yet">not yet</option>
          </select>
        </div>
        <input
          type="hidden"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          name="user_id"
          value="1"
        />
        <button
          className="w-75 offset-2 btn btn-sm btn-warning"
          onClick={() => addTask()}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTask