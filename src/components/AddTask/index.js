import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const AddPost = ({ addContact }) => {
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(true);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      return toast.warning("Please fill in all fields!!");
    }

    const data = {
      descripcion: description,
      valid: checked,
    };
    console.log(data);
    addContact(data);
    axios.post('http://localhost:8080/task/', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Task</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Add description to Task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input name="checked" type="checkbox" checked={checked} 
              onChange={e => setChecked(!checked)} />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Student"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
