import React from "react";
import "../App.css";
import { Row, Col } from "react-bootstrap";
import Icon from "./Icon";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector, useDispatch } from "react-redux";
import { setTrack, setUser, setRecent } from "../redux/actions/actions";
import { Api } from "../services/Api";

function SelectorCheckbox(props) {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.setTrack);
  const recent = useSelector((state) => state.setRecent);

  // const [recent, setRecent] = useState([]);

  console.log(props.track.thumbnail_url);
  

  return (
    <>
    
      <div className="music-list-item">
        <span style={{ marginRight: 15 }} className="trk_name">
          {props.key}
        </span>
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

        <span style={{ marginRight: 15, marginLeft: 15 }} className="trk_name">
          {props.track.track_name}
        </span>

       
          <input
            type="checkbox"
            id="lineAcross"
            defaultChecked={props.default}
            onChange={(event)=>props.onChange(event,props.track)}
          />
         
      </div>
     
    </>
  );
}

export default SelectorCheckbox;
