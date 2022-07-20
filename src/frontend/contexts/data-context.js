import { useContext, createContext, useReducer, useEffect } from "react";
import { dataReducer } from "../reducers/data-reducer";
import axios from "axios";

const DataContext = createContext();

const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/videos");
      dataDispatch({ type: "ORIGINAL", payload: response?.data?.videos });
    })();
  }, []);

  const [dataState, dataDispatch] = useReducer(dataReducer, {
    historyData: [],
    watchLaterData: [],
    likedData: [],
    playlistData: [],
    originalData: [],
    filteredData: [],
  });

  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export { useData, DataProvider };
