import "./home.css";
import { useData } from "../../contexts/data-context"
import { Navbar, Footer, VideoCard, Slider } from "../../components/index";

export function Home() {

  const { dataState } = useData()
  const { filteredData } = dataState


  return (
    <>
      <Navbar />
      <div className="home_container">
        {/* <Slideshow /> */}
        <div className="data_container">
          {filteredData.map((videoDetail) => (
            <VideoCard videoDetail={videoDetail} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
