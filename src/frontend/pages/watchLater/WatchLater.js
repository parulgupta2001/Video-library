import { useEffect } from "react";
import { getWatchLater } from "../../apiCalls/index";
import { useData } from "../../contexts/data-context";
import { useAuth } from "../../contexts/auth-context";
import { VideoCard, Navbar, EmptyVideo } from "../../components/index";
import "./watchLater.css";

export function WatchLater() {
  const { dataState, dataDispatch } = useData();
  const { watchLaterData } = dataState;
  const { authState } = useAuth();
  const { token } = authState;

  useEffect(() => {
    getWatchLater(token, dataDispatch);
  }, []);

  return (
    <div className="main">
      <Navbar />
      {watchLaterData.length > 0 ? (
        <div className="watchLater_container">
          {watchLaterData.map((videoDetail) => (
            <VideoCard videoDetail={videoDetail} />
          ))}
        </div>
      ) : (
        <EmptyVideo />
      )}
    </div>
  );
}
