import React, { createRef } from "react";
import "../App.css";
import { Form, Button, Container, Row, Modal } from "react-bootstrap";
import { setUser } from "../redux/actions/actions";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import firebase from "../services/Firebase";
import { Api } from "../services/Api";
import SelectorCheckbox from "./SelectorCheckBox";
import { getMusic } from "../getters/getMusic";

class Selector extends React.Component {
  state = {
    tracks: [],
    music: [],
    current_page: 0,
    loading: false,
  };

  componentDidMount() {
    this.fetchItems(this.state.current_page);
    console.log("playlist is  ", this.props.playlist);
  }


  fetchItems = (page) => {
    if(this.state.loading) return;
    this.setState({loading:true})
    getMusic({ offset: page }).then((res) => {
      if (res.length) {
        this.setState({ music: [...this.state.music, ...res] });
        this.setState((prevState) => {
          return {
            ...prevState,
            current_page: prevState.current_page + 8,
          };
        });
        this.setState({ loading: false });
      }
    });
  };
  parseData(data) {
    return data.replace(/(\r\n|\n|\r)/gm, "");
  }
  updatePlaylist = () => {
    //var fuid = localStorage.getItem("fid");
    if(this.state.tracks.length < 4){
      alert("We need at least 4 tracks in a playlist");
      return;
    }
    if(this.state.tracks.length > 12){
      alert("Maximum number of playlist is 12 for a free account");//i didn't hadnle past 12 songs 
      return;
    }
    try {
      let data = {
        id: this.props.playlist.id,
        tracks: JSON.stringify(this.state.tracks),
      };
      console.log("update playlist data is ", data);
      this.props.onUpdate(data);
    } catch (error) {
      console.log("Error", error);
      // this.setState({loading:false})
    }
  };
  

  renderSelectionItems = () => {
    return this.state.music.map((x, i) => {
      return (
        <SelectorCheckbox
          onChange={(event, track) => {
            console.log("the tracks is ", track);
            if(event.target.checked){
              this.setState({tracks:[...this.state.tracks,track]})
            }else{
              let new_tracks = this.state.tracks.filter((x)=>track.id == x.id)
              this.setState({tracks:new_tracks})
            }
          }}
          track={x}
          default={false}
        />
      );
    });
  };
  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) { 
      console.log("at the bottom");
      this.fetchItems(this.state.current_page)
      
    }
  }
  render() {
    return (
      <>
        <Modal
          show={this.props.visible}
          animation={false}
          onHide={this.props.onClose} 
         
        >
          
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 className="text-white align-center">
                Add To Your Playlist
              </h2>
            </Modal.Title>
          </Modal.Header>
          <div onScroll={this.handleScroll} id = "style-1" className = "modal-body selector-cntr scrollbar">
          
            <div className="justify-content-md-center container-selector">
              {this.renderSelectionItems()}
            </div>
          </div>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.updatePlaylist();
              }}
              className="btn-c abs"
            >
              Add To Playlist
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Selector;
