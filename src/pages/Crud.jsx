import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Crud = () => {
  const [searchItem, setSearchItem] = useState("");
  const [users, setUsers] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    id: null,
    name: "",
    username: "",
    completed: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    username: Yup.string().required("Username is Required"),
  });

  const handleFormSubmit = (values, action) => {
    if (updateId !== null) {
      const updatedFriends = users.map((item) =>
        item.id === updateId ? values : item
      );
      setUsers(updatedFriends);
      setUpdateId(null);
      action.resetForm();
    } else {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      const sameUser = storedUsers?.filter(
        (item) => item.name === values.name && item.username === values.username
      );
      console.log("sameUser: ", sameUser);
      if (sameUser?.length) {
        alert("This User Already Defined");
        action.resetForm();
      } else {
        values.id = users.length + 1;
        setUsers([...users, values]);
        action.resetForm();
      }
    }
  };
  const { values, handleChange, handleSubmit, errors, setValues } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchItem(e?.target?.value);
    const filteredItems = users.filter((user) =>
      user.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setUsers(filteredItems);
  };

  const handleDelete = (delId) => {
    const updatedUser = users.filter((item) => item.id !== delId);
    setUsers(updatedUser);
  };

  const handleEdit = (editId) => {
    const findUserData = users.find((item) => {
      return item?.id === editId;
    });
    setValues(findUserData);
    setUpdateId(editId);
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = users.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setUsers(updatedTasks);
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>CRUD Application with Hooks</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="flex-row">
          <div className="flex-large">
            <h2>Add user</h2>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name ? (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {errors.name}
                </div>
              ) : null}
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              {errors.username ? (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {errors.username}
                </div>
              ) : null}
              <button>{updateId ? "Update" : "Add"}</button>
            </form>
          </div>
          <div className="flex-large">
            <input
              type="text"
              placeholder="Search..."
              value={searchItem}
              onChange={handleSearch}
            />
            <h2>View users</h2>
            <table>
              <thead>
                <tr>
                  <th>To-Do</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.length > 0 ? (
                  <>
                    {users?.map((item) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => toggleTaskStatus(item.id)}
                              />
                            </td>
                            <td
                              style={{
                                textDecoration: item.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {item?.name}
                            </td>
                            <td
                              style={{
                                textDecoration: item.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {item?.username}
                            </td>
                            <td>
                              <button
                                className="button muted-button"
                                onClick={() => handleEdit(item?.id)}
                              >
                                Edit
                              </button>
                            </td>
                            <td>
                              <button
                                className="button muted-button"
                                onClick={() => handleDelete(item?.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td colSpan={3}>No users</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crud;
