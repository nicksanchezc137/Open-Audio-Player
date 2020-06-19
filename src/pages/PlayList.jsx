import React, { useEffect, useState } from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "../components/NavBar";
import ButtonComponent from "../components/ButtonComponent";
import ModalComponent from "../components/ModalComponent";
import AddPlaylist from "./AddPlaylist";
import Selector from "../components/Selector";
import { Api } from "../services/Api";
import { useSelector } from "react-redux";
import AudioTrackCard from "../components/AudioTrackCard";

function Playlist(props) {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylistArray] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [playlist, setPlaylist] = useState({ title: "Add To Playlist" });
  const user = useSelector((state) => state.setUser);

  useEffect(() => {
    setLoading(true);
    getAllPlaylists(page);
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    //clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!fetching) return;
    getAllPlaylists(page);
  }, [fetching]);

  const updatePlaylist = (data) => {
    try {
      console.log("update playlist data is ", data);
      Api.post("update_playlist.php", data)
        .then((res) => {
          console.log("data is ", JSON.stringify(res.data));
          if (res.data.status == "Success") {
            //this.props.onComplete(data);
            setVisible2(false);
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
      console.log("at the bottom and setting the fetching to true=======");
      setFetching(true);
    }
  };

  const getAllPlaylists = () => {
    console.log("trying to get playlist when the page is ", page);
    try {
      let data = {
        id: user.id ? user.id : 1,
        filter: "all",
        page: page,
      };
      console.log(
        "get all playlist dat ---------------- playlist data is ",
        data
      );
      setLoading(true);
      Api.post("get_playlists.php", data)
        .then((res) => {
          console.log("data is ", res.data);
          if (res.data.status == "Success") {
            //this.props.onComplete(data);
            setVisible2(false);
            console.log(res.data.message);
            let playlist_ = res.data.message.map((x) => {
              return { id: x.id, name: x.name, tracks: JSON.parse(x.tracks) };
            });
            setPlaylistArray((prev) => [...prev, ...playlist_]);
            // setLastID(Number(res[res.length - 1].id) + 1);
            setPage((prev) => prev + 2);
            setLoading(false);
            setFetching(false);
          }else{
            setLoading(false);
            setFetching(false);
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          setLoading(false);
          setFetching(false);
        });
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
      setFetching(false);
    }
  };
  const renderPlaylist = () => {
    return playlists.map((x) => {
      return (
        <>
          <Row>
            <Col lg={6}>
              <h2 className="text-white margin-t">{x.name}</h2>
            </Col>
          </Row>

          <Row className="custom-row">{renderTracks(x.tracks, x.id)}</Row>
        </>
      );
    });
  };

  const renderTracks = (tracks, playlist_id) => {
    console.log("tracks is----------------- ", tracks);
    return tracks.map((track, key) => {
      return (
        <>
          <AudioTrackCard
            key={key}
            navigation={props.history}
            track={track}
            playlist={tracks}
            playlist_id={playlist_id}
          />
        </>
      );
    });
  };

  return (
    <>
      <NavbarComponent navigation={props.history} />
      <ModalComponent visible={visible}>
        <AddPlaylist
          onComplete={(playlist) => {
            console.log("I am setting platlist bloody funcking!! ", playlist);

            setPlaylist(playlist);
            setVisible(false);
            setVisible2(true);
          }}
          onClose={() => setVisible(false)}
        />
      </ModalComponent>

      <Selector
        visible={visible2}
        onUpdate={(data) => updatePlaylist(data)}
        playlist={playlist}
        title="Add To Playlist"
        onClose={() => setVisible2(false)}
        onComplete={() => setVisible2(false)}
      />

      <Container className="cntr-dark" fluid>
        {!loading && playlists.length? (
          <Row>
            <Col lg={6}>
              <h2 className="text-white margin-t">Popular Playlists</h2>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col lg={6}>
            {user.email != "no email" && !loading ? (
              <a
                className="primary-text add-plst"
                href="javascript:void(0)"
                onClick={() => setVisible(true)}
              >
                Add Playlist
              </a>
            ) : null}
          </Col>
        </Row>

        {renderPlaylist()}
      </Container>
    </>
  );
}

export default Playlist;
