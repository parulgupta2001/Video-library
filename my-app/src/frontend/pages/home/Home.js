import { Slider } from "../../components/slider/Slider";
import { useState, useEffect } from "react";
import { GoPlay } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import "./home.css";
import "../../../App.css";

export function Home() {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    axios.get("/api/videos").then((response) => {
      setVideoData(response.data.videos);
      console.log(response.data.videos);
    });
  }, []);

  return (
    <div className="home_container">
      <Slider />
      <div className="data_container">
        {videoData.map(({ img, title }) => (
          <div className="card_container">
            <img className="img_card_container" src={img} alt="img" />
            <div className="on_hover">
              <div>{title}</div>
              <button>
                <MdOutlineWatchLater />
                Watch Later
              </button>
              <button>
                <AiOutlineLike />
                Add to Liked
              </button>
              <button>
                <GoPlay />
                Add to Playlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
