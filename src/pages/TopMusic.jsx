import React, { useState, useEffect } from "react";
import "../App.css";
import { Container, Row ,Col} from "react-bootstrap";
import NavbarComponent from "../components/NavBar";
import { getMusic } from "../getters/getMusic";
import LoaderComponent from "../components/LoadingComponent";
import AudioTrackCard from "../components/AudioTrackCard";

function TopMusic(props) {

  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchItems(8);
    window.scrollTo(0, 0);
  }, []);

  const fetchItems = (page) => {
    getMusic({ offset: page }).then((res) => {
      if (res.length) {
        console.log("Setting music as ", res);
        setMusic((prev) => [...prev, ...res]);
        setLoading(false);
      }
    });
  };
  const renderMusic = () => {
    return music.map((track) => {
      return (
        <>
          {loading ? (
            <LoaderComponent />
          ) : (
            <AudioTrackCard navigation={props.history} track={track} playlist = {music} />
          )}
        </>
      );
    });
  };
  return (
    <>
      <NavbarComponent navigation={props.history}/>

      <Container className="cntr-dark" fluid>
      {!loading?<Row >
        <Col lg={6}>
          <h2 className="text-white margin-t">Top Weekly </h2>
        </Col>
      </Row>:null}
        <Row className="custom-row">{renderMusic()}</Row>
      </Container>
    </>
  );
}

export default TopMusic;
