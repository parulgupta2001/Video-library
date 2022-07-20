import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { GoPlay } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { useData } from "../../contexts/data-context";
import {
  addToWatchLater,
  deleteFromWatchLater,
  addToLiked,
  deleteFromLiked,
  addToHistory,
  deleteFromHistory,
  deleteVideoFromPlaylist,
} from "../../apiCalls/index";
import { useAuth } from "../../contexts/auth-context";
import { PlaylistModal } from "../index";
import "./videoCard.css";

export function VideoCard(prop) {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { videoDetail } = prop;
  const { img, title, _id } = videoDetail;
  const { authState } = useAuth();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const [modal, setModal] = useState(false);
  const { watchLaterData, likedData, historyData } = dataState;

  return (
    <div>
      <div className={modal ? "no_hover" : "card_container"}>
        <Link to={`/playVideo/${_id}`} className="video_link">
          <img
            className="img_card_container"
            src={img}
            alt="img"
            onClick={() => {
              if (token) {
                if (historyData.find((video) => video._id === _id)) {
                  deleteFromHistory(_id, token, dataDispatch);
                  addToHistory(videoDetail, token, dataDispatch);
                } else {
                  addToHistory(videoDetail, token, dataDispatch);
                }
              }
            }}
          />
        </Link>
        <div className="on_hover">
          <div>{title}</div>
          {token ? (
            watchLaterData.find((video) => video._id === _id) ? (
              <button
                onClick={() => deleteFromWatchLater(_id, token, dataDispatch)}
              >
                <MdOutlineWatchLater />
                Remove From Watch Later
              </button>
            ) : (
              <button
                onClick={() =>
                  addToWatchLater(videoDetail, token, dataDispatch)
                }
              >
                <MdOutlineWatchLater />
                Watch Later
              </button>
            )
          ) : (
            <button onClick={() => navigate("/login")}>
              <MdOutlineWatchLater />
              Watch Later
            </button>
          )}
          {token ? (
            likedData.find((video) => video._id === _id) ? (
              <button onClick={() => deleteFromLiked(_id, token, dataDispatch)}>
                <AiOutlineLike />
                Remove From Liked
              </button>
            ) : (
              <button
                onClick={() => addToLiked(videoDetail, token, dataDispatch)}
              >
                <AiOutlineLike />
                Add To Liked
              </button>
            )
          ) : (
            <button onClick={() => navigate("/login")}>
              <AiOutlineLike />
              Add To Liked
            </button>
          )}
          <button
            onClick={(e) => {
              token ? setModal((prev) => !prev) : navigate("/login");
            }}
          >
            <GoPlay />
            Add To Playlist
          </button>
          {window?.location?.pathname === "/history" && (
            <button onClick={() => deleteFromHistory(_id, token, dataDispatch)}>
              Remove From History
            </button>
          )}
          {window?.location?.pathname === `/playlist/${playlistId}` && (
            <button
              onClick={() =>
                deleteVideoFromPlaylist(
                  playlistId,
                  videoDetail._id,
                  token,
                  dataDispatch
                )
              }
            >
              Remove From This Playlist
            </button>
          )}
        </div>
        {modal ? (
          <PlaylistModal setModal={setModal} videoDetail={videoDetail} />
        ) : null}
      </div>
    </div>
  );
}
