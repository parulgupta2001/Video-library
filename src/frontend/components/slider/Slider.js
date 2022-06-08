import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { useEffect, useState } from "react";
import axios from "axios";

const properties = {
  duration: 2000,
  transitionDuration: 1000,
  arrows: true,
  pauseOnHover: false,
};

export function Slideshow() {
  const [image, setImage] = useState([]);

  useEffect(() => {
    axios.get("/api/videos").then((response) => {
      setImage(response.data.videos);
    });
  }, []);

  return (
    <div className="slide-container">
      <Slide {...properties}>
        {image.map((each, index) => (
          <img
            key={index}
            style={{
              width: "100%",
              height: "10rem",
              marginTop: "4.3rem",
            }}
            src={each.slide_img}
            alt="slide_images"
          />
        ))}
      </Slide>
    </div>
  );
}
