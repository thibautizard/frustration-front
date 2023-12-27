import React from "react";
import styles from "./PostCard.module.css";

const PostCard = ({ title, excerpt, image, date, categories, slug }) => {
  const cardRef = React.useRef(null);
  const cardImageRef = React.useRef(null);
  const overlayRef = React.useRef(null);

  const handleMouseMove = ({ clientX, clientY }) => {
    const rotationIntensity = 3;
    const overlayFactor = 2;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const [x, y] = [clientX - left, clientY - top];

    cardRef.current.style.transitionDuration = "0ms";
    cardRef.current.style.transform = `rotateX(${-(y / (height / 2) - 1) * rotationIntensity}deg)
    rotateY(${(x / (width / 2) - 1) * rotationIntensity}deg)`;

    cardImageRef.current.style.transitionDuration = "0ms";
    cardImageRef.current.style.transform = `scale(1.1)
                                            translateX(${((width - x) / width - 0.5) * 25}px)
                                            translateY(${((height - y) / height - 0.5) * 25}px)`;

    overlayRef.current.style.transitionDuration = "0ms";
    overlayRef.current.style.transform = `translate3d(${-((x * (100 / overlayFactor)) / width - 50 / overlayFactor)}%,
                                          ${-((y * (100 / overlayFactor)) / height - 50 / overlayFactor)}%,
                                          0)`;

    overlayRef.current.style.opacity = Math.abs(width / 2 - x) / width + Math.abs(height / 2 - y) / height;
  };

  const handleMouseOut = () => {
    cardRef.current.style.transitionDuration = "500ms";
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    cardImageRef.current.style.transitionDuration = "500ms";
    cardImageRef.current.style.transform = `scale(1)
                                            translateX(0px)
                                            translateY(0px)`;
    overlayRef.current.style.transitionDuration = "500ms";
    overlayRef.current.style.opacity = "0";
    overlayRef.current.style.transform = `translate3d(0%, 0%, 0);`;
  };
  return (
    <article className={styles.postContainer}>
      <div
        className={styles.wrapper}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      >
        <div className={styles.thumbnailWrapper}>
          <img
            ref={cardImageRef}
            className={styles.thumbnail}
            title={image.title}
            src={image.sourceUrl}
            alt={image.altText}
            width="500"
            height="300"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h5 className={styles.title}>{title}</h5>
            <div className={styles.categories}>
              {categories.map((category: string) => (
                <span
                  key={category.toLowerCase()}
                  className={styles.category}
                >
                  {category}
                </span>
              ))}
            </div>
            <div>
              <span className={styles.date}>{date}</span>
            </div>
          </div>
          <div
            className={styles.moreDetails}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></div>
        </div>
        <div
          ref={overlayRef}
          className={styles.overlay}
        ></div>
      </div>
    </article>
  );
};

export default PostCard;
