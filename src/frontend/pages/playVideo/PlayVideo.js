import { Navbar, PlaylistModal } from "../../components/index";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillLike, AiFillPlayCircle } from "react-icons/ai";
import { BsFillStopwatchFill } from "react-icons/bs";
import { useAuth } from "../../contexts/auth-context";
import { useData } from "../../contexts/data-context";
import {
  addToLiked,
  deleteFromLiked,
  deleteFromWatchLater,
  addToWatchLater,
} from "../../apiCalls/index";
import axios from "axios";
import "./playVideo.css";

export function PlayVideo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useAuth();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { likedData, watchLaterData } = dataState;

  const { videoId } = useParams();
  const [clickedVideo, setClickedVideo] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    (async () => {
      const response1 = await axios.get(`/api/video/${videoId}`);
      setClickedVideo(response1.data.video);
      const response2 = await axios.get("/api/videos");
      setAllVideos(response2.data.videos);

      setRelatedVideos(
        allVideos
          .filter((video) => video.category === clickedVideo.category)
          .filter((videoData) => videoData._id !== clickedVideo._id)
      );
    })();
  }, [relatedVideos]);

  const presentInLiked = likedData.find(
    (video) => video._id === clickedVideo._id
  );

  const presentInWatchLater = watchLaterData.find(
    (video) => video._id === clickedVideo._id
  );

  return (
    <div className="main">
      <Navbar />
      <div className="play_video_container">
        <div className="play_video_content_container">
          <div className="iframe_container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
          <div className="play_video_content">
            <div>{clickedVideo.title}</div>

            <div className="play_video_icons">
              <AiFillLike
                title="Like"
                className={presentInLiked ? "present" : "absent"}
                onClick={() => {
                  token
                    ? presentInLiked
                      ? deleteFromLiked(clickedVideo._id, token, dataDispatch)
                      : addToLiked(clickedVideo, token, dataDispatch)
                    : navigate("/login", { state: { from: location } });
                }}
              />

              <BsFillStopwatchFill
                title="Watch later"
                className={presentInWatchLater ? "present" : "absent"}
                onClick={() => {
                  token
                    ? presentInWatchLater
                      ? deleteFromWatchLater(
                          clickedVideo._id,
                          token,
                          dataDispatch
                        )
                      : addToWatchLater(clickedVideo, token, dataDispatch)
                    : navigate("/login", { state: { from: location } });
                }}
              />

              <AiFillPlayCircle
                title="Playlist"
                className="play_video_playlist"
                onClick={(e) => {
                  token
                    ? setModal((prev) => !prev)
                    : navigate("/login", { state: { from: location } });
                }}
              />
            </div>
          </div>
        </div>

        <div className="related_videos_container">
          {relatedVideos.map(({ _id, title, img }) => (
            <Link
              to={`/playVideo/${_id}`}
              className="related_videos_content"
              key={_id}
            >
              <img src={img} className="related_videos_img" />
              <div className="related_videos_title">{title}</div>
            </Link>
          ))}
        </div>
      </div>
      {modal ? (
        <PlaylistModal setModal={setModal} videoDetail={clickedVideo} />
      ) : null}
    </div>
  );
}
