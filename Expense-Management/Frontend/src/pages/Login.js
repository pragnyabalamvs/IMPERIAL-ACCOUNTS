import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../App.css";
const Login = () => {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/Home");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/Home");
    }
  }, [navigate]);
  return (
    <>
    <div className="login">
      <div className="login-page ">
        {loading && <Spinner />}
        <div className="row container">
          
          <div className="col-ms-8 login-form">
            <Form layout="vertical" onFinish={submitHandler}>
            <h3>Workflow Management </h3>
            <hr/>
              <h3>Login Form</h3>
              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required />
              </Form.Item>
              <button className="btn">Login</button>
              <hr/>
              <div className="d-flex justify-content-between">
                <Link to="/register">
                  Not a user ? Click Here to regsiter !
                </Link>
               
              </div>
            </Form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
