import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import styles from "./Swiper.module.css";

export const MySwiper = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // // listen for Swiper events using addEventListener
    // swiperElRef.current.addEventListener("swiperprogress", (e) => {
    //   const [swiper, progress] = e.detail;
    //   console.log(progress);
    // });

    // swiperElRef.current.addEventListener("swiperslidechange", (e) => {
    //   console.log("slide changed");
    // });

    // Register Swiper web component
    register();

    // Object with parameters
    const params = {
      slidesPerView: 3,
      breakpoints: {
        768: {
          slidesPerView: 4
        }
      }
    };

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    // initialize swiper
    swiperRef.current.initialize();
  }, []);

  return (
    <swiper-container
      className={styles.error}
      ref={swiperElRef}
      init="false"
    >
      <swiper-slide>Slide 11</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper-container>
  );
};
