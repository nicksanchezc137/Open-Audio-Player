import React from "react";
import "../App.css";
import Modal from "react-modal";

function ModalComponent(props) {
  const customStyles = {
    content: {
     padding:25,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding:55,
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <Modal
        isOpen={props.visible}
        onAfterOpen={props.afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
        portalClassName  = "top-modal"
        contentLabel={props.contentLabel}
      >
        {props.children}
      </Modal>
    </>
  );
}

export default ModalComponent;
