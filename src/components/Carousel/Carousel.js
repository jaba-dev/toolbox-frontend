import React from "react";
import styles from "./carousel.module.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";

function Carousel() {
  const slides = ["first", "second", "third", "fourth"];
  const { baseURL, publicURL, initialState, setInitialState } =
    useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoRunning, setIsAutoRunning] = useState(true);
  const changeSlide = (nextBtn, prevBtn) => {
    handleClick();
    if (nextBtn) {
      if (currentSlide < 3) {
        setCurrentSlide((prevSlide) => prevSlide + 1);
      }
    }
    if (prevBtn) {
      if (currentSlide > 0) {
        setCurrentSlide((prevSlide) => prevSlide - 1);
      }
    }
  };
  const handleClick = () => {
    setIsAutoRunning(false);
    setTimeout(() => {
      setIsAutoRunning(true);
    }, 5000);
  };
  useEffect(() => {
    let intervalId;
    if (isAutoRunning) {
      intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => {
          if (prevSlide < 3) {
            return prevSlide + 1;
          } else {
            return 0;
          }
        });
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isAutoRunning]);
  return (
    <div
      className={styles.carousel}
      onClick={() => {
        setInitialState(!initialState);
      }}
    >
      <button
        className={styles.prevButton}
        onClick={() => changeSlide(undefined, "prevBtn")}
      >
        &#10094;
      </button>
      <div
        className={`${styles.carouselTrack} ${styles[slides[currentSlide]]} `}
      >
        <div>
          <img src={`/images/0002.jpg`} alt="First slide" />
        </div>
        <div>
          <img src={`/images/0004.jpg`} alt="Second slide" />
        </div>
        <div>
          <img src={`/images/0005.jpg`} alt="Third slide" />
        </div>
        <div>
          <img src={`/images/0006.jpg`} alt="Fourth slide" />
        </div>
      </div>
      <button
        className={styles.nextButton}
        onClick={() => changeSlide("nextBtn", undefined)}
      >
        &#10095;
      </button>
      <div className={styles.bullets}>
        <span
          style={{
            backgroundColor: currentSlide === 0 ? "#717171" : "",
          }}
          onClick={() => {
            setCurrentSlide(0);
            handleClick();
          }}
        ></span>
        <span
          style={{
            backgroundColor: currentSlide === 1 ? "#717171" : "",
          }}
          onClick={() => {
            setCurrentSlide(1);
            handleClick();
          }}
        ></span>
        <span
          style={{
            backgroundColor: currentSlide === 2 ? "#717171" : "",
          }}
          onClick={() => {
            setCurrentSlide(2);
            handleClick();
          }}
        ></span>
        <span
          style={{
            backgroundColor: currentSlide === 3 ? "#717171" : "",
          }}
          onClick={() => {
            setCurrentSlide(3);
            handleClick();
          }}
        ></span>
      </div>
    </div>
  );
}

export default Carousel;
