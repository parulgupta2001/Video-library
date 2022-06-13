import {Navbar} from "../../components/navbar/Navbar";
import {useParams,Link} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
import "./playVideo.css";

export function PlayVideo(){

    const {videoId} = useParams()

    const [relatedVideos, setRelatedVideos] = useState([]);
    useEffect(() => {
      (async () => {
        const response1 = await axios.get(`/api/video/${videoId}`);
        const clickedVideo = response1.data.video;
        const response2 = await axios.get("/api/videos");
        const allVideos = response2.data.videos;
  
        setRelatedVideos(
          allVideos.filter((video) => video.category === clickedVideo.category).filter(videoData=>videoData._id !== clickedVideo._id)
        );
      })();
    }, [relatedVideos]);  

    console.log(relatedVideos);
  

    return (
        <>
          <Navbar />
          <div className="play_video_container">
          <div className="iframe_container">
              <iframe
                width="700"
                height="500"
                src={`https://www.youtube-nocookie.com/embed/${videoId}/?autoplay=1`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowfullscreen
              ></iframe>
              </div>

              <div className="related_videos_container">
          {relatedVideos.map(({ _id, title, img }) => (
            <Link to={`/playVideo/${_id}`} className="related_videos_content">
              <img src={img} className="related_videos_img" />
              <div>{title}</div>
            </Link>
          ))}
        </div>
        </div>
     </>
    )
}