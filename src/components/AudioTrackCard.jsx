import React, { useState } from "react";
import "../App.css";
import { Card, Button, Col } from "react-bootstrap";
import Icon from "./Icon";
import { useSelector, useDispatch } from "react-redux";
import {
  setTrack,
  setUser,
  setRecent,
  setPlaylist,
} from "../redux/actions/actions";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Api } from "../services/Api";
function AudioTrackCard(props) {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.setTrack);
  const recent = useSelector((state) => state.setRecent);

  // const [recent, setRecent] = useState([]);

  console.log(props.track.thumbnail_url);
  const registerPlay = () => {
    try {
      let data = {
        id: track.id,
      };
      console.log("data is ", data);
      Api.post("register_play.php", data)
        .then((res) => {
          console.log("data is ", JSON.stringify(res.data));
          if (res.data.status == "Success") {
            console.log("track registered!");
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          // this.setState({loading:false})
        });
    } catch (error) {
      console.log("Error", error);
      // this.setState({loading:false})
    }
  };
  const registerPlaylistPlay = (id) => {
    try {
      let data = {
        id: id,
      };
      console.log("data is ", data);
      Api.post("register_playlist_play.php", data)
        .then((res) => {
          console.log("data is ", JSON.stringify(res.data));
          if (res.data.status == "Success") {
            console.log("track registered!");
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          // this.setState({loading:false})
        });
    } catch (error) {
      console.log("Error", error);
      // this.setState({loading:false})
    }
  };
  const playTrack = () => {
    dispatch(setTrack(props.track));

    //check if tracks belongs to playlists page
    if (props.playlist_id) {
      //register playlist
      console.log("playlist id is ", props.playlist_id);
      registerPlaylistPlay(props.playlist_id);
    }
    registerPlay();
    let recent_playlist = [...recent];
    recent_playlist.splice(0, 0, props.track);
    //check if the track is already in the playlist
    //set current playlist
    dispatch(setPlaylist(props.playlist));
    let check_contains = recent.some((x) => x.id == props.track.id);
    if (!check_contains) {
      let arr = recent_playlist.filter((x, i) => i < 4);
      console.log("recent playlist is ", arr);
      dispatch(setRecent(arr));
    }
  };
  return (
    <>
      <Col lg={3} md={6} sm={6} xs={12}>
        <Card className="c-card">
          <Link
            className="justify-content-md-center align-center"
            onClick={() => {
              props.navigation.push("/track/id=" + props.track.id);
            }}
          >
            <LazyLoadImage
              alt={
                "https://www.iftf.org/uploads/RTEmagicC_Screen_Shot_2017-10-02_at_2.12.10_PM_03.png.png"
              }
              src={`${props.track.thumbnail_url}`}
              className="img-c"
              effect="blur"
            />
          </Link>
          {track.id == props.track.id ? (
            <Button
              className={`btn-custom2`}
              onClick={() => {
                //dispatch(setTrack(props.track));
                //pressed pause
              }}
            >
              {" "}
              <Icon name="play" />
            </Button>
          ) : (
            <Button
              className={`btn-custom`}
              onClick={() => {
                //pressed play
                playTrack();
              }}
            >
              {" "}
              <Icon name="play" />
            </Button>
          )}
          <Card.Body className="card-body-c" style={{ borderRadius: 25 }}>
            <Card.Title>
              {props.track.track_name.length >= 21
                ? props.track.track_name.slice(0, 21) + " ..."
                : props.track.track_name}
            </Card.Title>
            <Card.Text>
              {props.track.track_desc.length >= 21
                ? props.track.track_desc.slice(0, 21) + " ..."
                : props.track.track_desc}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default AudioTrackCard;
