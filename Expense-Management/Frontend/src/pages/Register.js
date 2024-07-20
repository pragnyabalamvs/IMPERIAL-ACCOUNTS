import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../App.css";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
    <div className="register"></div>
      <div className="register-page ">
        {loading && <Spinner />}
        <div className="row container">
          <div className="col-ms-8 register-form ">
        <Form layout="vertical" onFinish={submitHandler} >
        <h3>Workflow Management </h3>
          <h3>Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/">Already Register? login here!</Link>
            <button className="btn ">Resgiter</button>
          </div>
        </Form>
        </div>
      </div>
      </div>
    </>
  );
};

export default Register;
