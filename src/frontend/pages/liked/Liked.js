import { useEffect } from "react";
import { getLiked } from "../../apiCalls/index";
import { useData} from "../../contexts/data-context";
import {useAuth} from "../../contexts/auth-context";
import { VideoCard,Navbar,EmptyVideo } from "../../components/index";
import "./liked.css";

export function Liked() {
  const { dataState, dataDispatch } = useData();
  const { likedData } = dataState;
  const { authState } = useAuth();
  const { token } = authState;

  useEffect(() => {
    getLiked(token, dataDispatch);
  }, []);

  return(
    <>
   <Navbar />
   {likedData.length > 0 ? (<div className="liked_container">
  {likedData.map((videoDetail) => <VideoCard videoDetail={videoDetail} />)};
  </div>):(<EmptyVideo />)}
  </>
  )
}