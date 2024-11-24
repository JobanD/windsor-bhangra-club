"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function MediaModal({ media }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);

  const openModal = (media) => {
    setCurrentMedia(media);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentMedia(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Display media items with click-to-expand functionality */}
      <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
        {media.map((item, idx) => (
          <div
            key={idx}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 cursor-pointer"
            onClick={() => openModal(item)}
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt="Media"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            ) : (
              <video
                controls
                width="600"
                height="400"
                className="rounded-lg object-cover"
              >
                <source src={item.url} type={item.contentType} />
              </video>
            )}
          </div>
        ))}
      </div>

      {/* Modal for expanded media */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking outside the media
        >
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl z-50"
            >
              &times;
            </button>
            {currentMedia.type === "image" ? (
              <Image
                src={currentMedia.url}
                alt="Expanded image"
                width={1000}
                height={700}
                className="rounded-lg"
              />
            ) : (
              <video controls className="rounded-lg w-full max-w-xl mx-auto">
                <source
                  src={currentMedia.url}
                  type={currentMedia.contentType}
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </>
  );
}
