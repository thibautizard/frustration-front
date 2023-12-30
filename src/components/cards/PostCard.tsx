import React from "react";

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
    <article
      className={`group/container basis-[32%] grow min-w-[250px] h-[375px] lg:h-[450px]`}
      style={{ perspective: "1200px" }}
    >
      {/* Wrapper */}
      <div
        className="flex flex-col items-center cursor-pointer h-full bg-black overflow-hidden shadow-[0_0_1rem_4px_rgba(0,0,0,0.7)]"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      >
        {/* Thumbnail */}
        <div className="overflow-hidden w-full">
          <img
            ref={cardImageRef}
            className="w-full object-cover"
            title={image.title}
            src={image.sourceUrl}
            alt={image.altText}
            width="500"
            height="300"
          />
        </div>
        {/* Content */}
        <div className="grow p-[5%] pb-0">
          {/* Header */}
          <div className="flex flex-col mb-[1rem] gap-[0.4rem]">
            {/* Title */}
            <h5 className="text-yellow leading-none font-bebas text-3xl md:text-3xl xl:text-4xl">{title}</h5>
            {/* Categories */}
            <div className="flex gap-1">
              {/* Category */}
              {categories.map((category: string) => (
                <span
                  key={category.toLowerCase()}
                  className="text-black bg-yellow text-base font-bebas uppercase rounded px-2"
                >
                  {category}
                </span>
              ))}
            </div>
            {/* Date */}
            <span className="text-white text-sm font-open-sans">{date}</span>
          </div>
          {/* Excerpt */}
          <div
            className={`grid grid-rows-[0fr] group-hover/container:grid-rows-[1fr] text-white font-open-sans overflow-hidden transition-[ grid-template-rows] duration-500  group-hover/container:*:mb-5 *:overflow-hidden`}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></div>
        </div>
        {/* Overlay */}
        <div className="overflow-hidden absolute h-full w-full">
          <div
            ref={overlayRef}
            className={`absolute w-[200%] h-[200%] rounded-3xl left-[-50%] top-[-50%] opacity-0 bg-[radial-gradient(circle_at_50%,hsla(0,0%,100%,0.25),transparent_50%)]`}
          ></div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
