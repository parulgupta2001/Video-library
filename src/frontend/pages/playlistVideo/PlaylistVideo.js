import { Navbar, VideoCard, EmptyVideo } from "../../components/index";
import { useData } from "../../contexts/data-context";
import { useParams } from "react-router-dom";
import "./playlistVideo.css";

export function PlaylistVideo() {
  const { playlistId } = useParams();
  const {
    dataState: { playlistData },
  } = useData();

  const singlePlaylist = playlistData.find(
    (playlist) => playlist._id === playlistId
  );

  return (
    <div className="playlist_video_container main">
      <Navbar />
      <div className="playlist_video_content">
        {singlePlaylist?.videos?.length > 0 ? (
          singlePlaylist.videos.map((videoDetail) => (
            <VideoCard videoDetail={videoDetail} key={videoDetail._id} />
          ))
        ) : (
          <EmptyVideo />
        )}
      </div>
    </div>
  );
}
