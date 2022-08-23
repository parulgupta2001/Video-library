import "./home.css";
import { useData } from "../../contexts/data-context";
import { Navbar, Footer, VideoCard, Slider } from "../../components/index";

export function Home() {
  const { dataState } = useData();
  const { filteredData } = dataState;

  return (
    <div className="main">
      <Navbar />
      <div className="home_container">
        <Slider />
        <div className="data_container">
          {filteredData.map((videoDetail) => (
            <VideoCard videoDetail={videoDetail} key={videoDetail._id} />
          ))}
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
}
