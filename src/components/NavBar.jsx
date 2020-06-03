import React, { useState, useEffect } from "react";
import "../App.css";
import { Navbar, Nav, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import Headroom from "react-headroom";
import ModalComponent from "./ModalComponent";
import Login from "../pages/Login";
import SignUp from "../pages/SIgnUp";
import Upload from "../pages/Upload";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setRecent } from "../redux/actions/actions";
import firebase from "../services/Firebase";
function NavbarComponent(props) {
  const [visible, setModal] = useState(false);
  const [visible2, setModal2] = useState(false);
  const [visible3, setModal3] = useState(false);
  const user = useSelector((state) => state.setUser);
  const dispatch = useDispatch();

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{user.name}</Popover.Title>
      <Popover.Content>
        <a
          onClick={() => {
            firebase
              .auth()
              .signOut()
              .then(function () {
                // Sign-out successful.
                dispatch(
                  setUser({
                    name: "no name",
                    email: "no email",
                    phone: "",
                    fuid: "",
                    type: "",
                    id: 0,
                  })
                );
                dispatch(setRecent([]));
                window.location.reload();
              })
              .catch(function (error) {
                // An error happened
              });
          }}
          href="javascript:void(0)"
          className="primary-text"
        >
          Logout
        </a>
      </Popover.Content>
    </Popover>
  );
  return (
    <>
      <ModalComponent visible={visible}>
        <Login
          onSignup={() => {
            setModal(false);
            setModal2(true);
          }}
          onComplete={() => {
            setModal(false);
            setModal2(false);
          }}
          onClose={() => setModal(false)}
        />
      </ModalComponent>

      <ModalComponent visible={visible2}>
        <SignUp
          onLogin={() => {
            setModal2(false);
            setModal(true);
          }}
          onComplete={() => {
            setModal(false);
            setModal2(false);
          }}
          onClose={() => setModal2(false)}
        />
      </ModalComponent>
      <ModalComponent visible={visible3}>
        <Upload onClose={() => setModal3(false)} />
      </ModalComponent>

      <Headroom>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="nav-bar"
        >
          <Navbar.Brand href="javascript:void(0)">
            <Link className="nav-link white-text" to="/debe/">
              <img className="logo-nav" src={require("../assets/logo.png")} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav c-collapse">
            <Nav className="mr-auto">
              <Nav.Link href="javascript:void(0)">
                {" "}
                <Link className="nav-link" to="/debe/">
                  Tracks
                </Link>
              </Nav.Link>
              <Nav.Link href="javascript:void(0)">
                {" "}
                <Link className="nav-link" to="/debe/top-weekly/">
                  Top Weekly
                </Link>
              </Nav.Link>
              <Nav.Link href="javascript:void(0)">
                {" "}
                <Link className="nav-link" to="/debe/playlist/">
                  Playlists
                </Link>
              </Nav.Link>
              {user.email != "no email" ? (
                <ButtonComponent
                  onClick={() => {
                    if (user.email == "no email") {
                      setModal(true);
                    } else {
                      setModal3(true);
                    }
                  }}
                >
                  {" "}
                  Upload
                </ButtonComponent>
              ) : null}
            </Nav>
            {user.email == "no email" ? (
              <Nav>
                <Nav.Link
                  href="javascript:void(0)"
                  onClick={() => setModal(true)}
                >
                  Login
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                >
                  <Nav.Link href="javascript:void(0)">Profile</Nav.Link>
                </OverlayTrigger>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Headroom>
    </>
  );
}

export default NavbarComponent;
