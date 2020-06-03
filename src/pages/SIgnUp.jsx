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

function SignUp(props) {
  const [user, setUSer] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const signupWithEmailAndPassword = () => {
    console.log(email, password, username);
    if (email.trim() && password.trim()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((res) => {
          console.log(res.user);

          //save user on local storage
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(
              function () {
                console.log("user logged in");
                props.onComplete()
              },
              function (error) {
                // An error happened.
              }
            );
          saveUser({
            fuid: res.user.uid,
            email,
            name: username,
            phone: "",
            type: "user",
          });
        })
        .catch((error) => {
          // Handle Errors here.
          let errorCode = error.code;
          this.setState({ loading: false });
          let errorMessage = error.message;
          // this.warningNotification(errorMessage);
          alert(errorMessage);
        });
    } else {
      // this.setState({ loading: false });
      //this.warningNotification("Please fill in all the fields");
      alert("Please fill in all the fields");
    }
  };

  const saveUser = (user) => {
    try {
      console.log("data is ", user);
      Api.post("create_user.php", user)
        .then((res) => {
          console.log("data is ", JSON.stringify(res.data));
          if (res.data.status == "Success") {
            // this.props.history.push("/app");
            // this.props.setUser({...user});

            dispatch(setUser({...user,id:res.data.message}));
            // this.setState({ loading: false });
          } else {
            console.log("Email exists");
            // this.warningNotification("A user with the same email exists");
            // this.setState({ loading: false });
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          // this.warningNotification("An error has occured. Please try again later.");
          // this.setState({ loading: false });
        });
    } catch (error) {
      console.log("Error", error);
      // this.warningNotification("An error has occured. Please try again later.");
      // this.setState({ loading: false });
    }
  };
  return (
    <>
      <Row className="justify-content-md-center">
        <h2 className="text-white align-center">Free Signup</h2>

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
              placeholder="Username"
              label="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
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
          <ButtonComponent onClick={() => signupWithEmailAndPassword()}>
            Signup
          </ButtonComponent>
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ marginTop: 25 }}>
        <Col lg={12} className="justify-content-md-center text-center">
          <a
            onClick={props.onLogin}
            href="javascript:void(0)"
            className="primary-text"
          >
            Already have an account? Login
          </a>
        </Col>
      </Row>
    </>
  );
}

export default SignUp;
