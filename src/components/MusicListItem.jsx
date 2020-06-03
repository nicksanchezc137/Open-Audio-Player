import React from "react";
import "../App.css";
import { Row, Col } from "react-bootstrap";
import Icon from "./Icon";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector, useDispatch } from "react-redux";
import { setTrack, setUser, setRecent } from "../redux/actions/actions";
import { Api } from "../services/Api";

function MusicLIstItem(props) {


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
  const playTrack = () => {
    dispatch(setTrack(props.track));
    registerPlay();
    let recent_playlist = [...recent];
    recent_playlist.splice(0, 0, props.track);
    //check if the track is already in the playlist

    let check_contains = recent.some((x)=>x.id== props.track.id);
    if (!check_contains) {
      let arr = recent_playlist.filter((x, i) => i < 4);
      console.log("recent playlist is ", arr);
      dispatch(setRecent(arr));
    }
  };
  return (
    <>
      <div className = "music-list-item">
        <span style = {{marginRight:15}} className="trk_name">{props.key}</span>
        <LazyLoadImage
         
          alt={
            "https://www.iftf.org/uploads/RTEmagicC_Screen_Shot_2017-10-02_at_2.12.10_PM_03.png.png"
          }
          src={`${props.track.thumbnail_url}`}
          className="img-e"
          effect="blur"
          height={50}
          width={50}
        />

        <span  style = {{marginRight:15,marginLeft:15}} className="trk_name">{props.track.track_name}</span>
        {track.id == props.track.id ? 
        <a
          className="play-btn2"
          href="javascript:void(0)"
          onClick={()=>{
            //set the audio
            //playTrack();
          }}
        >
          <Icon name="pause" />
        </a>: <a
          className="play-btn"
          href="javascript:void(0)"
          onClick={()=>{
            //set the audio
            playTrack();
          }}
        >
          <Icon name="play" />
        </a>}
      </div>
    </>
  );
}

export default MusicLIstItem;
