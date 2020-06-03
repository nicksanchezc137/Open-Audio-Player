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
import { useDispatch, useSelector } from "react-redux";

function AddPlaylist(props) {

  const [name, setName] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.setUser);

  const createPlaylist = ()=> {
    //var fuid = localStorage.getItem("fid");
    try {
      let data = {
        user_id: user.id,
        name,
        tracks:JSON.stringify([])
      };
      console.log("data is ", data);
      Api.post("create_playlist.php", data)
        .then(res => {
          console.log("data is ", JSON.stringify(res.data));
         if (res.data.status == "Success") {
            props.onComplete({...data,id:res.data.message})
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
        <h2 className="text-white align-center">Add Playlist</h2>

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
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              label="name"
              type="text"
            />
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ marginTop: 15 }}>
        <Col lg={12} className="justify-content-md-center text-center">
          <ButtonComponent onClick = {()=>{
              createPlaylist();
          }}>Create Playlist</ButtonComponent>
        </Col>
      </Row>

    
    </>
  );
}

export default AddPlaylist;
