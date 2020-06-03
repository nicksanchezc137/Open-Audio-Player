import React from "react";
import "../App.css";
import { Container, Row,Col } from "react-bootstrap";
import NavbarComponent from "../components/NavBar";

function About(props) {
  return (
    <>
       <NavbarComponent navigation={props.history}/>

      <Container className="cntr-dark" fluid>
        <Row className="justify-content-md-center">
          <Col lg={6}>
            <h2 className="text-white align-center">About</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
