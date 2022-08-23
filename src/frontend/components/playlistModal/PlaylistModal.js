import { useData } from "../../contexts/data-context";
import { useAuth } from "../../contexts/auth-context";
import { MdClose } from "react-icons/md";

import {
  addNewPlaylist,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
} from "../../apiCalls/index";
import "./playlistModal.css";
import { useState } from "react";

export function PlaylistModal({ setModal, videoDetail }) {
  const [showNameField, setShowNameField] = useState(false);
  const [name, setName] = useState("");

  const {
    authState: { token },
  } = useAuth();
  const { dataState, dataDispatch } = useData();
  const { playlistData } = dataState;

  return (
    <div className="modal" onClick={() => setModal(false)}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        <div className="upper_modal_line">
          Save to...
          <MdClose onClick={() => setModal((prev) => !prev)} />
        </div>
        {playlistData.map((playlist) => (
          <li className="folder_list" key={playlist._id}>
            <input
              type="checkbox"
              checked={playlist.videos.find(
                (video) => video._id === videoDetail._id
              )}
              onChange={(e) =>
                e.target.checked
                  ? addVideoToPlaylist(
                      playlist._id,
                      videoDetail,
                      token,
                      dataDispatch
                    )
                  : deleteVideoFromPlaylist(
                      playlist._id,
                      videoDetail._id,
                      token,
                      dataDispatch
                    )
              }
            />
            <label htmlFor="_id">{playlist.title}</label>
          </li>
        ))}
        {!showNameField && (
          <div
            onClick={() => {
              setShowNameField((prev) => !prev);
            }}
            className="create_new_icon"
          >
            + Create New Playlist
          </div>
        )}
        {showNameField && (
          <div className="name_field">
            <input
              type="text"
              placeholder="Enter Playlist Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <button
              className="create_playlist_btn"
              onClick={() => {
                addNewPlaylist(name, token, dataDispatch);
                setName("");
              }}
            >
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
