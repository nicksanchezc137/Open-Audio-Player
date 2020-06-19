import React, { useEffect, useState } from "react";
import "../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavbarComponent from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../components/Icon";
import MusicLIstItem from "../components/MusicListItem";
import ButtonComponent from "../components/ButtonComponent";
import { Api } from "../services/Api";
import AddToPlaylist from "./AddToPlayList";
import ModalComponent from "../components/ModalComponent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { setTrack } from "../redux/actions/actions";

function Track(props) {
  const dispatch = useDispatch();
  const [track, setTrackState] = useState({});
  const [modal_visible, setModalVisible] = useState(false);
  const [user_tracks, setuserTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.setUser);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true)
    getTrack();
    //this.props.match.params.id;
  }, []);

  const getTrack = () => {
   
    try {
      let data = {
        id: props.match.params.id,
      };
      console.log("data is ", data);
      Api.post("get_track.php", data)
        .then((res) => {
          console.log("data is ", JSON.stringify(res.data));
          if (res.data.status == "Success") {
            setTrackState(res.data.message);
            setuserTracks(res.data.tracks);
            this.setState({loading:false})
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
           //this.setState({loading:false})
        });
    } catch (error) {
      console.log("Error", error);
      // this.setState({loading:false})
    }
  };

  const renderTracks = () => {
    return user_tracks.map((x, i) => {
      return <MusicLIstItem track={x} key={i} />;
    });
  };

  return (
    <>
      <NavbarComponent navigation={props.history} />
      <ModalComponent visible={modal_visible}>
        <AddToPlaylist onClose={() => setModalVisible(false)} />
      </ModalComponent>

      <Container className="cntr-dark" fluid>
        <Row className="justify-content-md-center" style={{ paddingTop: 25 }}>
          <Col
            className="justify-content-md-center text-center center-block"
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            <Row>
            <LazyLoadImage
              src={`${track.thumbnail_url}`}
              className="std-img img-fluid text-center"
              effect="blur"
            />
            </Row>

            <h4 className="text-white desc">{track.track_desc}</h4>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="list-container">
            <span>
              <h2 className="text-white title-c">{track.track_name} </h2>
            </span>

            {user.email == "no email" && !user_tracks.length ? null : (
              // <ButtonComponent onClick={() => setModalVisible(true)}>
              //   Add To Playlist
              // </ButtonComponent>

              <ButtonComponent onClick={()=>{
                dispatch(setTrack(track));
              }}>
                Play
              </ButtonComponent>
            )}

            <div className="music-list">{renderTracks()}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Track;
