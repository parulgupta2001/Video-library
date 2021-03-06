import { useNavigate } from "react-router-dom";
import { GoPlay } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { useData } from "../../contexts/data-context";
import {
    addToWatchLater,
    deleteFromWatchLater,
    addToLiked,
    deleteFromLiked,
    deleteFromHistory
} from "../../apiCalls/index";
import { useAuth } from "../../contexts/auth-context";

export function HistoryCard(prop) {

    const navigate = useNavigate()
    const { videoDetail } = prop;
    const { img, title, _id } = videoDetail;
    const { authState } = useAuth();
    const { token } = authState;
    const { dataState, dataDispatch } = useData();
    const { watchLaterData, likedData } = dataState;

    return (
        <>
            <div className="card_container">
                <img className="img_card_container" src={img} alt="img" />
                <div className="on_hover">
                    <div>{title}</div>
                    {token ? watchLaterData.find((video) => video._id === _id) ? (
                        <button onClick={() => deleteFromWatchLater(_id, token, dataDispatch)}>
                            <MdOutlineWatchLater />
                            Remove From Watch Later
                        </button>) : (
                        <button onClick={() => addToWatchLater(videoDetail, token, dataDispatch)}>
                            <MdOutlineWatchLater />
                            Watch Later
                        </button>) : navigate("/login")}

                    {token ? likedData.find((video) => video._id === _id) ? (
                        <button onClick={() => deleteFromLiked(_id, token, dataDispatch)}>
                            <AiOutlineLike />
                            Remove From Liked
                        </button>) : (<button onClick={() => addToLiked(videoDetail, token, dataDispatch)}>
                            <AiOutlineLike />
                            Add to Liked
                        </button>) : navigate("/login")}

                    <button>
                        <GoPlay />
                        Add to Playlist
                    </button>

                    <button onClick={() => deleteFromHistory(_id, token, dataDispatch)}>
                        Remove From History
                    </button>

                </div>
            </div>
        </>
    )
}