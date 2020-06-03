import React from "react";
import "../App.css";
import { Form } from "react-bootstrap";

function InputComponent(props) {
  return (
    <>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className = "text-white">{props.label}</Form.Label>
        <Form.Control className = "input-c" type={props.type} placeholder={props.placeholder} />
      </Form.Group>
    </>
  );
}

export default InputComponent;
