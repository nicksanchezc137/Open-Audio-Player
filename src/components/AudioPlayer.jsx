import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import { Container } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setTrack, setRecent } from "../redux/actions/actions";
import { Api } from "../services/Api";
import { LazyLoadImage } from "react-lazy-load-image-component";

function AudioPlayerComponent() {
  const track = useSelector((state) => state.setTrack);
  const playlist = useSelector((state) => state.setPlaylist);
  const dispatch = useDispatch();
  const player = useRef(null);
  const recent = useSelector((state) => state.setRecent);

  useEffect(() => {
    if (!player.current) {
      player.current = true;
    } else {
      console.log("the component has updated");
      // do componentDidUpate logic
      play();
    }
  });

  console.log("THE TRACK IS ----------", track);
  const play = () => {
    const audio_player = player.current.audio.current;
    audio_player.play();
  };

  const onNext = () => {
    //get the index of the currently playing track
    if (playlist.length) {
      let index = playlist
        .map(function (e) {
          return e.id;
        })
        .indexOf(track.id);
      //check if the playlist has reached the end!
      console.log("next track should be ", index);
      if (index == playlist.length - 1) {
        dispatch(setTrack(playlist[0]));
        addRecent(playlist[0]);
      } else {
        dispatch(setTrack(playlist[index + 1]));
        addRecent(playlist[index + 1]);
      }
    } else {
      alert("no playlist :(");
    }
  };
  const addRecent = (track) => {
    //dispatch(setTrack(props.track));
    registerPlay(track);
    let recent_playlist = [...recent];
    recent_playlist.splice(0, 0, track);
    //check if the track is already in the playlist
    //set current playlist
    //dispatch(setPlaylist(props.playlist));
    let check_contains = recent.some((x) => x.id == track.id);
    if (!check_contains) {
      let arr = recent_playlist.filter((x, i) => i < 4);
      console.log("recent playlist is ", arr);
      dispatch(setRecent(arr));
    }
  };
  const registerPlay = (track) => {
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
  const onPrevious = () => {
    //get the index of the currently playing track
    if (playlist.length) {
      let index = playlist
        .map(function (e) {
          return e.id;
        })
        .indexOf(track.id);
      //check if the playlist has reached the end!
      console.log("next track should be ", index);
      if (index == 0) {
        dispatch(setTrack(playlist[playlist.length - 1]));
        addRecent(playlist[playlist.length - 1]);
      } else {
        dispatch(setTrack(playlist[index - 1]));
        addRecent(playlist[index - 1]);
      }
    } else {
      alert("no playlist :(");
    }
  };
  const renderImage = () => {
    return (
      // <LazyLoadImage
      //   src={`${track.thumbnail_url}`}
      //   className="img-f"
      //   effect="blur"
      // />
      <></>
    );
  };
  return (
    <>
      <AudioPlayer
        ref={player}
        volume={0.5}
        showSkipControls={true}
        onClickNext={() => onNext()}
        onClickPrevious={() => onPrevious()}
        onEnded={() => onNext()}
        className="audio-player"
        src={track.audio_url}
        header={renderImage()}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </>
  );
}

export default AudioPlayerComponent;
