import "./App.css";
import { Navbar } from "./frontend/components/navbar/Navbar";
import { Footer } from "./frontend/components/footer/Footer";
import {
  Home,
  History,
  Liked,
  Playlist,
  WatchLater,
} from "./frontend/pages/index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/watchLater" element={<WatchLater />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
