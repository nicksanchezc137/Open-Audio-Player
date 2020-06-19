import React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "../components/NavBar";
import firebase from "../services/Firebase";
import FileUploader from "react-firebase-file-uploader";
import InputComponent from "../components/Input";
import ButtonComponent from "../components/ButtonComponent";
import { saveMusic } from "../saveMusic/saveTrack";
import Icon from "../components/Icon";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/actions";

class Upload extends React.Component {
  state = {
    track_name: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    track_name: "",
    track_url: "",
    track_desc: "",
    thumbnail_url: "",
    loading: false,
  };

  handleChange = (event) => this.setState({ track_name: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = (filename, file_type) => {
    let self = this;
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref(file_type)
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        if (file_type == "audio") {
          self.setState({ track_url: url });
          console.log("the audio url is ", url);
        } else {
          self.setState({ thumbnail_url: url });
          console.log("the image url is ", url);
        }
      });
  };
  isUrlValid(userInput) {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) return false;
    else return true;
  }

  handleSumbission() {
    if (this.state.track_url) {
      let url =
        this.state.thumbnail_url && this.isUrlValid(this.state.thumbnail_url)
          ? this.state.thumbnail_url
          : "https://open-audio.ibua.co.ke/assets/placeholder.png";
      let data = {
        user_id: this.props.user.id,
        track_name: this.state.track_name,
        track_desc: this.state.track_desc,
        thumbnail_url: url,
        audio_url: this.state.track_url,
      };
      console.log("the data is ", data);
      saveMusic(data).then((res) => {
        this.props.onFinish()
        alert("Audio Submitted!");
      });
    } else {
      alert("Still uploading...");
    }
  }

  render() {
    return (
      <>
        <Row className="justify-content-md-center">
          <h2 className="text-white align-center">Upload Audio</h2>
          <a
            className="close-btn"
            href="javascript:void(0)"
            onClick={this.props.onClose}
          >
            <Icon name="times" />
          </a>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={12} md={12}>
            <label
              style={{
                backgroundColor: "steelblue",
                color: "white",
                padding: 10,
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Choose Audio File
              <FileUploader
                accept="audio/*"
                name="avatar"
                hidden
                randomizeFilename
                storageRef={firebase.storage().ref("audio")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={(name) =>
                  this.handleUploadSuccess(name, "audio")
                }
                onPro
                gress={this.handleProgress}
              />
            </label>
          </Col>
          <Col lg={3} md={12}>
            {" "}
            <span className="primary-text">
              {/* Progress: {this.state.progress} */}
            </span>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col lg={12} md={12}>
            <label
              style={{
                backgroundColor: "steelblue",
                color: "white",
                padding: 10,
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Choose Track Thumbnail
              <FileUploader
                accept="image/*"
                name="avatar"
                hidden
                randomizeFilename
                storageRef={firebase.storage().ref("image")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={(name) =>
                  this.handleUploadSuccess(name, "image")
                }
                onPro
                gress={this.handleProgress}
              />
            </label>
          </Col>
          <Col lg={3} md={12}>
            {" "}
            <span className="primary-text">
              {/* Progress: {this.state.progress} */}
            </span>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col lg={12} md={12}>
            <label className="text-white ali">Name</label>
            <input
              type="text"
              className="input-c"
              placeholder={"Track Name"}
              onChange={this.handleChange}
              value={this.state.track_name}
            />
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col lg={12} md={12}>
            <label className="text-white ali">Track Description</label>

            <input
              type="text"
              className="input-c"
              placeholder={"Track Description"}
              onChange={(event) =>
                this.setState({ track_desc: event.target.value })
              }
              value={this.state.track_desc}
            />
          </Col>
        </Row>
        <Row><span className = "warning">Please view our terms of use before uploading</span></Row>
        <Row className="justify-content-md-center align-center">
          <Col lg={12} md={12}>
            {this.state.isUploading && this.state.loading ? (
              <ButtonComponent
                disabled={true}
                onClick={() => {
                  this.handleSumbission();
                }}
              >
                Submit
              </ButtonComponent>
            ) : (
              <ButtonComponent
                onClick={() => {
                  this.handleSumbission();
                }}
              >
                Submit
              </ButtonComponent>
            )}
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("summary-------", state);
  return {
    user: state.setUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
