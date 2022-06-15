import { getHistory } from "../../apiCalls/index";
import { useAuth} from "../../contexts/auth-context";
import {useData} from "../../contexts/data-context";
import { VideoCard,Navbar,EmptyVideo } from "../../components/index";
import { useEffect } from "react";
import "./history.css";

export function History() {
  const { authState } = useAuth();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { historyData } = dataState;

  useEffect(() => {
    getHistory(token, dataDispatch);
  }, []);

  return (
    <>
      <Navbar />
      {historyData.length > 0 ? (
      <div className="history_container">
      {historyData.map((videoDetail) => (
        <VideoCard videoDetail={videoDetail}/>
      ))}
      </div>):(
        <EmptyVideo />
      )}
    </>
  );
}
