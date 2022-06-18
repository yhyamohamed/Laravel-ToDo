import React, { useEffect, useState } from "react";
import AddTask from "./AddTask.js";
import axios from "axios";
const Home = () => {
  const BASE_URL = "http://127.0.0.1:8000/api/todos";

  const [msg, setMsg] = useState(null);
  const [needrefresh, setNeedRefresh] = useState(null);
  const [allTasks, setAllTasks] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);
  const[showAddBox,setShowAddBox] = useState(false)

  const getMsgFromChilds = (data, err) => {
    if (data) {
      setMsg("to do added");
      setNeedRefresh(true)
    } else {
      setMsg(err);
    }
  };
const fetchApiData = ()=>{
  axios
    .get(BASE_URL)
    .then((res) => {
      if (res.status !== 200)
        throw Error("error.. cant fetch data for that url");
      //return only data from response as an arr
      return Object.values(res.data)[0];
    })
    .then((data) => {
      setAllTasks(data);
      console.log(data);
      setError(false);
      setIsPending(false);
    })
    .catch((err) => {
      if (err.name === "CanceledError") {
        //do nothing
      } else {
        setError(Object.values(err.response)[0]);
        setIsPending(false);
      }
    });
}
const toggleAddBox = ()=>{
  setShowAddBox(!showAddBox)
}
  useEffect(() => {
  fetchApiData()
  }, [needrefresh]);

  return (
    <div className="row">
      {msg && (
        <div className="alert alert-primary" role="alert">
          {msg}
        </div>
      )}
      {isPending && (
        <div className="alert alert-primary" role="alert">
          <span
            className="spinner-border text-info spinner-border-m me-2"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </span>
          Getting Data pleas wait!
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          we'r sry , {error} ..pls try again later!
        </div>
      )}

      {allTasks && (
        <>
          <table className="table table-striped table-hover">
            <caption style={{ captionSide: "top" }}>
              <h5 className="d-inline">List of Tasks :</h5>
            
              {!showAddBox&&<button className="btn btn-sm btn-success offset-7 col-3" onClick={toggleAddBox}> Add a task</button>}
             { showAddBox&&<button className="btn btn-sm btn-warning offset-7 col-3" onClick={toggleAddBox}>Hide add box </button>}
            </caption>

            <thead>
              <tr className="table-primary">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Created By</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.map((task) => (
                <tr key={task.id}>
                  <th>{task.id}</th>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                  <td>{task.creator?.name}</td>
                  <td>{task.created_at}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button className="btn btn-sm btn-primary me-1">
                      Details
                    </button>
                    <button className="btn btn-sm btn-warning me-1">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger me-1">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {showAddBox&&<AddTask childMsg={getMsgFromChilds} />}
    </div>
  );
};

export default Home;
