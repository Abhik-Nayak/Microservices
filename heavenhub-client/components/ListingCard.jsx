// components/ListingCard.js
"use client";

import Image from "next/image";

export default function ListingCard({
  image,
  title,
  location,
  price,
  listedBy,
  carParking,
  advertised,
  avatar,
}) {
  return (
    <div className="max-w-sm w-full lg:max-w-full shadow-md rounded overflow-hidden">
      {/* Property Image */}
      <div
        className="h-48 lg:h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        title="Property Image"
      ></div>

      {/* Property Details */}
      <div className="border border-gray-300 bg-white p-4 flex flex-col justify-between leading-normal">
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
    </div>
  );
}
