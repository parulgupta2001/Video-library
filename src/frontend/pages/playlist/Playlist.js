import { useData } from "../../contexts/data-context";
import { PlaylistFolder, Navbar, EmptyVideo } from "../../components/index";
import "./playlist.css";

export function Playlist() {
  const {
    dataState: { playlistData },
  } = useData();

  return (
    <div className="playlist_container main">
      <Navbar />
      <div className="Playlist_content">
        {playlistData.length > 0 ? (
          playlistData.map((playlist) => (
            <PlaylistFolder playlist={playlist} key={playlist._id} />
          ))
        ) : (
          <EmptyVideo />
        )}
      </div>
    </div>
  );
}
