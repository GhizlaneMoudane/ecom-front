import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Discover Premium Collections",
      subtitle: "Exclusive products curated just for you",
      image:
        "https://static.thcdn.com/images/xlarge/webp/widgets/95-fr/36/original-Page-004-084536.jpg",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Explore our latest additions",
      image:
        "https://static.thcdn.com/images/xlarge/webp/widgets/95-en/52/original-0109_660205_LF_JN_Sol_Batching_1920x600-152352.jpg",
    },
    {
      id: 3,
      title: "Limited Edition",
      subtitle: "Exclusive items available for a limited time",
      image:
        "https://static.thcdn.com/images/xlarge/webp/widgets/95-fr/05/original-0102_650070_LF_AMR_ESPA_BOTM_Shot2_FR_1920x600-092405.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Automatically change slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 700);
    }
  }, [isAnimating, slides.length]);

  const goToPrevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsAnimating(false), 700);
    }
  }, [isAnimating, slides.length]);

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 700);
    }
  };

  return (
    <div className="relative w-full h-screen max-h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center max-w-4xl px-6">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 transform transition-all duration-700 ease-out"
                    style={{
                      opacity: index === currentIndex ? 1 : 0,
                      transform: index === currentIndex ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: '300ms'
                    }}>
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-white mb-8 transform transition-all duration-700 ease-out"
                   style={{
                     opacity: index === currentIndex ? 1 : 0,
                     transform: index === currentIndex ? 'translateY(0)' : 'translateY(20px)',
                     transitionDelay: '400ms'
                   }}>
                  {slide.subtitle}
                </p>
                <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-lg transform transition-all duration-700 ease-out"
                        style={{
                          opacity: index === currentIndex ? 1 : 0,
                          transform: index === currentIndex ? 'translateY(0)' : 'translateY(20px)',
                          transitionDelay: '500ms'
                        }}>
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 z-30 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition duration-300"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition duration-300"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-4 bottom-8 left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;