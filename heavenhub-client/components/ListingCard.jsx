"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Slider from "react-slick";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};
export default function ListingCard({
  image,
  images = [],
  title,
  location,
  price,
  listedBy,
  carParking,
  advertised,
  avatar,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCardClick = () => setIsOpen(true);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="max-w-sm w-full lg:max-w-full shadow-md rounded overflow-hidden bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out"
        onClick={handleCardClick}
      >
        <div className="relative h-48 lg:h-56 w-full">
          <Image
            src={image}
            alt="Property Image"
            fill
            className="object-cover rounded-t"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={70}
          />
        </div>

        <div className="border-t border-gray-300 p-4 flex flex-col justify-between leading-normal">
          <div className="mb-4">
            <div className="text-gray-900 font-bold text-xl mb-1">{title}</div>
            <p className="text-sm text-gray-600 mb-1">📍 {location}</p>
            <p className="text-green-600 font-semibold mb-2">₹{price}</p>

            <ul className="text-gray-700 text-sm space-y-1">
              <li>
                <strong>Listed By:</strong> {listedBy}
              </li>
              <li>
                <strong>Car Parking:</strong> {carParking}
              </li>
              <li>
                <strong>Advertised:</strong> {advertised}
              </li>
            </ul>
          </div>

          <div className="flex items-center mt-2">
            {avatar && (
              <Image
                className="w-10 h-10 rounded-full mr-3"
                src={avatar}
                alt="Avatar"
                width={40}
                height={40}
              />
            )}
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{listedBy}</p>
              <p className="text-gray-600">Real Estate Agent</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Modal View */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-6xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Image Slideshow */}
            <div className="w-full">
              <Slider {...sliderSettings}>
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index}>
                    <Image
                      src={`/Property${index + 1}.jpg`}
                      alt={`Slide ${index + 1}`}
                      width={600}
                      height={400}
                      className="rounded object-cover w-full"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Right: Details */}
            <div>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600 mb-1">📍 {location}</p>
              <p className="text-green-600 font-semibold mb-3">₹{price}</p>

              <ul className="text-gray-700 text-sm space-y-2 mb-4">
                <li>
                  <strong>Listed By:</strong> {listedBy}
                </li>
                <li>
                  <strong>Car Parking:</strong> {carParking}
                </li>
                <li>
                  <strong>Advertised:</strong> {advertised}
                </li>
              </ul>

              <div className="flex items-center">
                {avatar && (
                  <Image
                    className="w-10 h-10 rounded-full mr-3"
                    src={avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                )}
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">{listedBy}</p>
                  <p className="text-gray-600">Real Estate Agent</p>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
