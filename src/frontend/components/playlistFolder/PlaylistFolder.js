import "./playlistFolder.css";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/data-context";
import { useAuth } from "../../contexts/auth-context";
import { deletePlaylist } from "../../apiCalls/index";
import { CgPlayList } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";

export function PlaylistFolder({ playlist }) {
  const { title, _id, videos } = playlist;
  const { authState } = useAuth();
  const { token } = authState;
  const { dataDispatch } = useData();

  return (
    <div className="playlist_folder_container">
      {videos.length > 0 ? (
        <div className="playlist_folder_content">
          <Link to={`/playlist/${_id}`}>
            <img
              className="playlist_folder_img"
              src={videos[videos.length - 1].img}
              alt=""
            />
            <div className="overlay_text">
              {playlist.videos.length}
              <CgPlayList />
            </div>
          </Link>
        </div>
      ) : (
        <div className="playlist_folder_content empty_playlist">
          <Link to="/">Explore Videos</Link>
          <img
            src="http://res.cloudinary.com/dwhran9qg/image/upload/songs/empty_image_ei7jyp.jpg"
            alt=""
          />
        </div>
      )}

      <div className="playlist_folder_action">
        <span>{title}</span>
        <span onClick={() => deletePlaylist(playlist._id, token, dataDispatch)}>
          <AiFillDelete
            title="delete playlist"
            className="delete_playlist_folder"
          />
        </span>
      </div>
    </div>
  );
}
