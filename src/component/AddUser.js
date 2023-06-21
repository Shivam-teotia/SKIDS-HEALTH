import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import "./AddUser.css";
import userServices from "./services";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
const AddUser = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert.error("Phone number should be 10-digit long");
      return;
    }
    const newUser = {
      name,
      email,
      phone,
    };
    try {
      await userServices.addUser(newUser);
      alert.success("New User Added");
      navigate("/");
    } catch (err) {
      alert.error(err);
      return;
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography className="heading">Add New User !</Typography>
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
          ADD
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
