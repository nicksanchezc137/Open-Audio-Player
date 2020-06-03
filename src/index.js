import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AudioPlayerComponent from "./components/AudioPlayer";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SIgnUp";
import Upload from "./pages/Upload";
import TopMusic from "./pages/TopMusic";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import Track from "./pages/Track";
import Playlist from "./pages/PlayList";

const { persistor, store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/debe/" exact render={(props) => <App {...props} />} />
            <Route
              path="/debe/about/"
              exact
              render={(props) => <About {...props} />}
            />
            <Route
              path="/debe/login/"
              exact
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/debe/upload/"
              exact
              render={(props) => <Upload {...props} />}
            />
            <Route
              path="/debe/top-weekly/"
              exact
              render={(props) => <TopMusic {...props} />}
            />
            <Route
              path="/debe/signup/"
              exact
              render={(props) => <SignUp {...props} />}
            />
            <Route 
            path = "/debe/track/id=:id"  exact
            render={(props) => <Track {...props} />}
          />
           <Route 
            path = "/debe/playlist/"  exact
            render={(props) => <Playlist {...props} />}
          />
          </Switch>
        </BrowserRouter>
        <AudioPlayerComponent />
      </>
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
