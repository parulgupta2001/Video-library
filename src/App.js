import "./App.css";
import { RequiresAuth } from "./frontend/RequiresAuth";
import {
  Home,
  History,
  Liked,
  Playlist,
  WatchLater,
  Login,
  Signup,
  NotFound,
  PlayVideo,
  PlaylistVideo,
} from "./frontend/pages/index";
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/history"
          element={
            <RequiresAuth>
              <History />
            </RequiresAuth>
          }
        />
        <Route
          path="/liked"
          element={
            <RequiresAuth>
              <Liked />
            </RequiresAuth>
          }
        />
        <Route
          path="/playlist"
          element={
            <RequiresAuth>
              <Playlist />
            </RequiresAuth>
          }
        />
        <Route
          path="/watchLater"
          element={
            <RequiresAuth>
              <WatchLater />
            </RequiresAuth>
          }
        />
        <Route path="/playVideo/:videoId" element={<PlayVideo />}></Route>
        <Route path="playlist/:playlistId" element={<PlaylistVideo />} />
        <Route path="/test" element={<Mockman />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
