import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useHistory();

  const [description, setDescription] = useState({});
  const [checked, setChecked] = useState({});
  useEffect(() => {
    const getById = async () => {
      const response = await fetch(
        `http://localhost:8080/task/${id}`
      );
      const responseJson = await response.json();
      setDescription(responseJson.descripcion);
      setChecked(responseJson.valid)
    };
    getById();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: id,
      descripcion: description,
      valid: checked,
    };

    axios.put('http://localhost:8080/task/', data)
    .then(function (response) {
      console.log(response)
      toast.success(response.data);
      history.push("/");
    })
    .catch(function (error) {
      console.log(error);
    });

    
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={description}
                  placeholder={"Descripcion"}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input name="checked" type="checkbox" checked={checked} 
                onChange={e => setChecked(!checked)} />
                <label>¿La tarea está activa?</label>
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Task
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
