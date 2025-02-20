import React, { useState } from "react";

const Images = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const images = [
    "/src/assets/boj1.webp",
    "/src/assets/boj2.avif",
    "/src/assets/boj1.webp",
    "/src/assets/boj2.avif",   "/src/assets/boj1.webp",
    "/src/assets/boj2.avif",
  ];

  const maxThumbnailsToShow = 4;

  const handleImageChange = (index) => {
    setCurrentIndex(index);
  };

  const scrollThumbnailsLeft = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex((prev) => prev - 1);
    }
  };

  const scrollThumbnailsRight = () => {
    if (thumbnailStartIndex + maxThumbnailsToShow < images.length) {
      setThumbnailStartIndex((prev) => prev + 1);
    }
  };

  const visibleThumbnails = images.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + maxThumbnailsToShow
  );

  return (
    <div className="flex flex-col items-center w-full max-lg:w-10/12 max-sm:w-full">
      {/* Main Image */}
      <div className="relative w-96 h-96">
        <img
          src={images[currentIndex]}
          alt={`Product Image ${currentIndex + 1}`}
          className="rounded-lg w-full h-full object-cover cursor-pointer"
        />
      </div>

      {/* Thumbnails with scrolling */}
      <div className="flex items-center gap-2 pt-4 w-center">
        {/* Left Scroll Button */}
        <button
          onClick={scrollThumbnailsLeft}
          disabled={thumbnailStartIndex === 0}
          className={`p-2 rounded-full ${
            thumbnailStartIndex === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-black hover:bg-gray-200"
          }`}
        >
          ◀
        </button>

        {/* Thumbnails */}
        <div className="flex overflow-hidden w-center max-w-[400px]">
          <div className="flex gap-2">
            {visibleThumbnails.map((image, index) => {
              const globalIndex = thumbnailStartIndex + index;
              return (
                <button
                  key={globalIndex}
                  onClick={() => handleImageChange(globalIndex)}
                  className={`border rounded-lg overflow-hidden ${
                    currentIndex === globalIndex
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <div className="w-24 h-24">
                    <img
                      src={image.replace(".jpg", "-thumbnail.jpg")}
                      alt={`Thumbnail ${globalIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollThumbnailsRight}
          disabled={thumbnailStartIndex + maxThumbnailsToShow >= images.length}
          className={`p-2 rounded-full ${
            thumbnailStartIndex + maxThumbnailsToShow >= images.length
              ? "text-gray-300 cursor-not-allowed"
              : "text-black hover:bg-gray-200"
          }`}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Images;
