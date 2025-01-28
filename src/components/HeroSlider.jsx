import React, { useState, useEffect } from "react";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Slide 1",
      subtitle: "This is the first slide",
      image:
        "https://static.thcdn.com/images/xlarge/webp/widgets/95-fr/36/original-Page-004-084536.jpg",
    },
    {
      id: 2,
      title: "Slide 2",
      subtitle: "This is the second slide",
      image:
        "https://static.thcdn.com/images/xlarge/webp/widgets/95-en/52/original-0109_660205_LF_JN_Sol_Batching_1920x600-152352.jpg",
    },
    {
      id: 3,
      title: "Slide 3",
      subtitle: "This is the third slide",
      image:
        "https://static.thcdn.com/images/xlarge/webp/widgets/95-fr/05/original-0102_650070_LF_AMR_ESPA_BOTM_Shot2_FR_1920x600-092405.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Slides */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute block w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 text-white bg-black bg-opacity-50 p-4 rounded">
              <h2 className="text-2xl font-bold">{slide.title}</h2>
              <p className="mt-2">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? slides.length - 1 : currentIndex - 1
          )
        }
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>
      <button
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() =>
          setCurrentIndex((currentIndex + 1) % slides.length)
        }
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 9l4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default HeroSlider;
