import axios from "axios";

const getHistory = async (token, dataDispatch) => {
  try {
    const response = await axios.get("/api/user/history", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: response.data.history });
  } catch (err) {
    console.log(err);
  }
};

const addToHistory = async (video, token, dataDispatch) => {
  try {
    const response = await axios.post(
      "/api/user/history",
      { video },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dataDispatch({ type: "HISTORY", payload: response.data.history });
  } catch (err) {
    console.log(err);
  }
};

const deleteFromHistory = async (id, token, dataDispatch) => {
  try {
    const response = await axios.delete(`/api/user/history/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: response.data.history });
  } catch (err) {
    console.log(err);
  }
};

const deleteAllHistory = async (token, dataDispatch) => {
  try {
    const response = await axios.delete("/api/user/history/all", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: response.data.history });
  } catch (err) {
    console.log(err);
  }
};

export { getHistory, addToHistory, deleteFromHistory, deleteAllHistory };
