import React from "react";
import "../App.css";
import { Row, Col } from "react-bootstrap";

function InputComponent(props) {
  return (
    <>
    
    <Row className="justify-content-md-center">
          <Col lg={12} md={12}>
     <label className="text-white ali">{props.placeholder}</label>
     <input
           className = "input-c"
              type={props.type}
              placeholder = {props.placeholder}
              value={props.value}
              name={props.name}
              onChange={props.onChange}
            />
            </Col>
            </Row>
    </>
  );
}

export default InputComponent;
