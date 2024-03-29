import { deleteAllHistory, getHistory } from "../../apiCalls/index";
import { useAuth } from "../../contexts/auth-context";
import { useData } from "../../contexts/data-context";
import { HistoryCard, Navbar, EmptyVideo } from "../../components/index";
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
    <div className="main">
      <Navbar />
      {historyData.length > 0 ? (
        <div className="history_container">
          {historyData.map((videoDetail) => (
            <HistoryCard videoDetail={videoDetail} key={videoDetail._id} />
          ))}
        </div>
      ) : (
        <EmptyVideo />
      )}

      {historyData.length > 0 ? (
        <button
          className="clear_history_btn"
          onClick={() => deleteAllHistory(token, dataDispatch)}
        >
          Clear History
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
