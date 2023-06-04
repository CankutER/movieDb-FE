import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import "../../Css/addAudience.css";
import axios from "axios";

const AddAudience = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/manager/addAudience", {
        username: username,
        passwrd: password,
        fName: firstName,
        lName: lastName,
      });
      console.log("yolladim audience");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <Form
        className="add_audience_form"
        // initialValues={{ remember: true }}
      >
        <Input
          placeholder="Please enter username"
          value={username}
          onChange={(username) => setUsername(username.target.value)}
          className="audience_input"
        ></Input>

        <Input
          placeholder="Please enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="audience_input"
        ></Input>
        <Input
          placeholder="Please enter name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="audience_input"
        ></Input>
        <Input
          placeholder="Please enter last name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="audience_input"
        ></Input>

        <Button
          type="primary"
          className="audience_button"
          disabled={!username || !password || !firstName || !lastName}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddAudience;
