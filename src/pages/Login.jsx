import React, { useState } from "react";
import "../App.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { setUser } from "../redux/actions/actions";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import firebase from "../services/Firebase";
import { Api } from "../services/Api";
import { useDispatch } from "react-redux";

function Login(props) {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

const   signInWithEmailAndPassword = ()=> {
    if (email.trim() && password.trim()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then(res => {
          console.log(res);
          //save user in the redux store
          console.log(res.user);
          let user_data = {
            email: email,
            fuid: res.user.uid,
          };
          getUser(res.user.uid, user_data);
        })
        .catch(error => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode,errorMessage);
          // this.warningNotification("Error logging in, please confirm you have typed in your email and passowrd correctly.");
          // this.setState({loading:false})
        });
    } else {
      // this.warningNotification("Please fill all the fields");
      // this.setState({loading:false})
    }
  }
  const getUser = (fuid, user)=> {
    //var fuid = localStorage.getItem("fid");
    try {
      let data = {
        fuid: fuid
      };
      console.log("data is ", data);
      Api.post("get_user.php", data)
        .then(res => {
          console.log("data is ", JSON.stringify(res.data));
          if (res.data.message == "User not found") {
           alert("Cannot find user")
          } else if (res.data.status == "Success") {
            console.log("user logged in");
            dispatch(setUser({
                ...user,
                name:res.data.message.name,
                id:res.data.message.id,
                phone:""
              }));
             props.onComplete()
            // console.log("User exists");
            // this.props.history.push("/app");
            // this.setState({loading:false})
          }
        })
        .catch(error => {
          console.log("Error: ", error);
          // this.setState({loading:false})
        });
    } catch (error) {
      console.log("Error", error);
      // this.setState({loading:false})
    }
  }
  return (
    <>
      <Row className="justify-content-md-center">
        <h2 className="text-white align-center">Login</h2>

        <a
          className="close-btn"
          href="javascript:void(0)"
          onClick={props.onClose}
        >
          <Icon name="times" />
        </a>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg={12}>
          <Form>
          <InputComponent
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
              label="email"
              type="email"
            />

            <InputComponent
              placeholder="password"
              label="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ marginTop: 15 }}>
        <Col lg={12} className="justify-content-md-center text-center">
          <ButtonComponent onClick = {()=>signInWithEmailAndPassword()}>Login</ButtonComponent>
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ marginTop: 25 }}>
        <Col lg={12} className="justify-content-md-center text-center" onClick = {props.onSignup}>
         
        <a onClick = {props.onLogin} href = "javascript:void(0)" className = "primary-text">
            Don't have an account? Signup
            </a>
      
        </Col>
      </Row>
    </>
  );
}

export default Login;
