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

function AddToPlaylist(props) {

  const [playlists, setPlaylist] = useState([]);
  const dispatch = useDispatch();

  return (
    <>
      <Row className="justify-content-md-center">
        <h2 className="text-white align-center">Add To Playlist</h2>

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
         
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ marginTop: 15 }}>
        <Col lg={12} className="justify-content-md-center text-center">
          <ButtonComponent onClick = {()=>{}}>Add To Playlist</ButtonComponent>
        </Col>
      </Row>

    
    </>
  );
}

export default AddToPlaylist;
