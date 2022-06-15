import {Link} from "react-router-dom";
import "./emptyVideo.css";

export function EmptyVideo(){
    return(
        <div className="empty_video_container">
        <h3>You do not have any videos here</h3>
        <Link to="/" className="explore_link">Explore Videos</Link>
        </div>
    )
}