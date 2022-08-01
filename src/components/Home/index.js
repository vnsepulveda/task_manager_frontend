import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from 'moment';
import { useHistory } from "react-router";
import { toast } from "react-toastify";

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/task/all",
    )
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);

  const onClick = (e) => {
    const id = e.currentTarget.getAttribute("data-value")
    axios.delete(`http://localhost:8080/task/${id}`).then((response) => {
      toast.success(response);
      window.location.reload(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
          Add Task
        </Link>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Descripción</th>
                <th scope="col">Activa</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map((task, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{task.descripcion}</td>
                    <td>{task.valid ? <div>Si</div> : <div>No</div>}</td>
                    <td>{Moment(task.insert_time).format('DD-MM-YYYY HH:MM:SS')}</td>
                    <td>
                      <Link
                        to={`/edit/${task.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        value={task.id}
                        className="btn btn-sm btn-danger" onClick={onClick} data-value={task.id}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No tasks found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;