import React from "react";
import "../App.css";
import { Button } from "react-bootstrap";

function ButtonComponent(props) {
  return (
    <>
      {props.disabled ? (
        <Button  className="btn-d disabled">
          {props.children}
        </Button>
      ) : (
        <Button onClick={props.onClick} className="btn-c">
          {props.children}
        </Button>
      )}
    </>
  );
}

export default ButtonComponent;
