import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "./components/NavBar";
import AudioTrackCard from "./components/AudioTrackCard";
import { getMusic } from "./getMusic/getMusic";
import LoaderComponent from "./components/LoadingComponent";
import BottomLoader from "./components/BottomLoader";
import { useSelector, useDispatch } from "react-redux";

function App(props) {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const user = useSelector((state) => state.setUser);
  const recent_playlist = useSelector((state) => state.setRecent);
  console.log("USER IS ", user);

  useEffect(() => {
    setLoading(true);
    fetchItems(page);
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    //clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!fetching) return;
    fetchItems(page);
  }, [fetching]);

  const fetchItems = (page) => {
    setLoading2(true);
    getMusic({ offset: page }).then((res) => {
      if (res.length) {
        console.log("Setting music as ", res);
        setMusic((prev) => [...prev, ...res]);
        // setLastID(Number(res[res.length - 1].id) + 1);
        setPage((prev) => prev + 8);
        setFetching(false);
        setLoading(false);
        setLoading2(false);
      }
    });
  };

  const handleScroll = () => {
    let custom_offset = 3;
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset + custom_offset;
    if (windowBottom >= docHeight) {
      console.log("at the bottom");
      setFetching(true);
    }
  };

  const renderMusic = () => {
    return music.map((track) => {
      return (
        <>
          {loading ? (
            <LoaderComponent />
          ) : (
            <AudioTrackCard navigation={props.history} track={track} playlist = {music}/>
          )}
        </>
      );
    });
  };

  const renderRecenPlaylist = () => {
    return recent_playlist.map((track) => {
      return (
        <>
          {!loading ? (
            <AudioTrackCard navigation={props.history} track={track} playlist = {recent_playlist} />
          ) : null}
        </>
      );
    });
  };

  return (
    <>
      <NavbarComponent navigation={props.history} />

      <Container className="cntr-dark" fluid>
        {!loading ? (
          <>
            {recent_playlist.length ? (
              <Row>
                <Col lg={6}>
                  <h2 className="text-white margin-t">Recently Played</h2>
                </Col>
              </Row>
            ) : null}
            <Row className="custom-row">{renderRecenPlaylist()}</Row>

            <Row>
              <Col lg={6}>
                <h2 className="text-white margin-t">Popular Music</h2>
              </Col>
            </Row>
          </>
        ) : null}
        <Row className="custom-row">{renderMusic()}</Row>
        {loading2 ? <BottomLoader /> : null}
      </Container>
    </>
  );
}

export default App;
