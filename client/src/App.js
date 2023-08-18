import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import "./App.css";

function App() {
  const [item, setItem] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3012/gettask")
      .then((array) => setItem(array.data));
  }, []);

  const onDeleteTask = (id) => {
    axios
      .delete(`http://localhost:3012/delete/${id}`)
      .then((array) => setItem(array.data));
  };
  const onSubmitData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3012/addtask", { todo: newTask })
      .then((array) => setItem(array.data));
    setNewTask("");
  };

  const onDeleteAll = () => {
    axios
      .delete(`http://localhost:3012/deleteall/`)
      .then((array) => setItem(array.data));
  };
  return (
    <div className="conatiner">
      <h1>Task Todos</h1>
      <div className="card-container">
        <form onSubmit={onSubmitData} className="form-container">
          <input
            type="text"
            value={newTask}
            placeholder="Enter Task"
            className="input"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input type="submit" value="Submit" className="button" />
          <button className="clear-btn" onClick={onDeleteAll}>
            <MdDelete />
          </button>
        </form>
        <div className="view-container">
          <h1>Tasks</h1>
          <ul className="task-list">
            {item.map((each) => (
              <li key={each._id}>
                <p>{each.todo}</p>
                <button
                  className="delete-btn"
                  type="button"
                  onClick={() => onDeleteTask(each._id)}
                >
                  <MdDelete />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
