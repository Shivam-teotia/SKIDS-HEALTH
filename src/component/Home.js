import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";
import userServices from "./services";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updateId, setUpdateId] = useState("");
  const handleOpen = (id) => {
    setOpen(true);
    setUpdateId(id);
  };
  const handleClose = () => {
    setOpen(false);
    setUpdateId("");
  };
  useEffect(() => {
    getUsers();
  }, [users.length]);
  const getUsers = async () => {
    const data = await userServices.getAllUsers();
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteHandler = async (id) => {
    await userServices.deleteUser(id);
    alert.success("User Deleted");
    getUsers();
  };
  const updatehandler = async (e, id) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert.error("Phone number should be 10-digit long ");
      return;
    }
    const editUser = {
      name,
      email,
      phone,
    };
    try {
      await userServices.updateUser(updateId, editUser);
      getUsers();
      setName("");
      setEmail("");
      setPhone("");
      alert.success("User updated successfully");
      handleClose();
    } catch (err) {
      alert.error(err);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="home">
      <div>
        <Link to="/add">
          <Button variant="outlined">Add New User</Button>
        </Link>
      </div>
      <div className="cards">
        {users.length === 0 && <h2>No User Found</h2>}
        {users &&
          users.map((doc) => {
            return (
              <div className="card" key={doc.id}>
                <div className="card-details">
                  <Typography>Name : {doc.name}</Typography>
                  <Typography>Email : {doc.email}</Typography>
                  <Typography>Phone-No : {doc.phone}</Typography>
                </div>
                <div className="buttons">
                  <Button
                    variant="contained"
                    onClick={(e) => handleOpen(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit info:
            </Typography>
            <form className="editForm" onSubmit={updatehandler}>
              <input
                type="text"
                placeholder="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="email@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="ph-no."
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Button type="submit" className="button">
                Edit
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
