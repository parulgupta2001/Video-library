import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { Navbar,Footer,VideoCard,Slider } from "../../components/index";

export function Home() {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    axios.get("/api/videos").then((response) => {
      setVideoData(response.data.videos);
      console.log(response.data.videos);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="home_container">
        {/* <Slideshow /> */}
        <div className="data_container">
          {videoData.map((videoDetail) => (
            <VideoCard videoDetail={videoDetail} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
