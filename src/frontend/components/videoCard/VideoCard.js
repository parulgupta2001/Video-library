import {Link, useNavigate} from "react-router-dom";
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
} from "../../apiCalls/index";
import { useAuth } from "../../contexts/auth-context";
import "./videoCard.css";

export function VideoCard(prop){

    const navigate = useNavigate()
    const { videoDetail } = prop; 
    const { img,title, _id } = videoDetail;
    const { authState } = useAuth();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { watchLaterData, likedData, historyData } = dataState;

    return(
        <>
        <div className="card_container">
         <Link to={`/playVideo/${_id}`} className="video_link">
              <img className="img_card_container" src={img} alt="img" onClick={() => addToHistory(videoDetail, token, dataDispatch)} />
              </Link>
              <div className="on_hover">
                <div>{title}</div>
                {token ? watchLaterData.find((video) => video._id === _id) ? (
                <button onClick={() => deleteFromWatchLater(_id, token, dataDispatch)}>
                  <MdOutlineWatchLater />
                  Remove From Watch Later
                </button>):(
                  <button onClick={() => addToWatchLater(videoDetail, token, dataDispatch)}>
                  <MdOutlineWatchLater />
                   Watch Later
                </button>) : navigate("/login")}

                { token ? likedData.find((video) => video._id === _id) ? (
                <button onClick={() => deleteFromLiked(_id, token, dataDispatch)}>
                  <AiOutlineLike />
                  Remove From Liked
                </button>):(<button  onClick={() => addToLiked(videoDetail, token, dataDispatch)}>
                  <AiOutlineLike />
                  Add to Liked
                </button>) : navigate("/login")}

                <button>
                  <GoPlay />
                  Add to Playlist
                </button>
              </div>
            </div>
        </>
    )
}