import "./App.css";
import Navbar from "./layouts/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 bg-light p-1">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
