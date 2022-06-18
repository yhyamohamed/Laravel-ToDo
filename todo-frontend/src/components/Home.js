import React, { useEffect } from "react";
import useAxios from "../customHooks/useAxios.js";
import AddTask from "./AddTask.js";

const Home = () => {
  const { data:allTasks, isPending, error } = useAxios("GET","http://127.0.0.1:8000/api/todos");
   useEffect(() => {
     allTasks&&console.log(allTasks);
    //  console.log(isPending);
    //  console.log(error);

   }, [allTasks, isPending, error]);
   const addTask = ()=>{
     console.log('lol')
   }
  return (
    <div className="row">
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
        <table className="table table-striped table-hover">
          <caption style={{ captionSide: "top" }}>List of Tasks : </caption>
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
                <td>{task.creator.name}</td>
                <td>{task.created_at}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button className="btn btn-sm btn-primary me-1">
                    Details
                  </button>
                  <button className="btn btn-sm btn-warning me-1">Edit</button>
                  <button className="btn btn-sm btn-danger me-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <AddTask addTask={addTask}/>
    </div>
  );
}

export default Home