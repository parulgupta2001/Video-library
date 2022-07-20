import "./slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

export function Slider() {
  const url = "http://res.cloudinary.com/dwhran9qg/image/upload/songs";
  const items = [
    {
      URL: `${url}/slide_image1_x5o7up.jpg`,
      id: "bw7bVpI5VcM",
    },
    {
      URL: `${url}/slide_image_ywpksg.jpg`,
      id: "9iIX4PBplAY",
    },
    {
      URL: `${url}/slide_image2_erhqig.jpg`,
      id: "HFX6AZ5bDDo",
    },
    {
      URL: `${url}/slide_image3_dmhjvq.jpg`,
      id: "wruCWicGBA4",
    },
    {
      URL: `${url}/slide_image4_mny2wn.jpg`,
      id: "AtG7cx6p7DY",
    },
    {
      URL: `${url}/slide_image5_t3kruq.jpg`,
      id: "W7_0rE2N2ow",
    },
    {
      URL: `${url}/slide_image6_iyapnu.jpg`,
      id: "ezgYup6T5Vw",
    },
  ];
  const navigate = useNavigate();
  return (
    <Carousel
      className="carousel"
      autoPlay
      infiniteLoop
      interval={2000}
      showThumbs={false}
      showIndicators={false}
      onClickItem={(index, item) => {
        if (item.props.link !== undefined) {
          navigate(`playVideo/${item.props.link}`);
        }
      }}
    >
      {items.map((item) => (
        <img
          src={item.URL}
          className="slider_image"
          link={item.id}
          key={item.id}
        />
      ))}
    </Carousel>
  );
}
