import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingCard({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[330px]  xl:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpgWJAboVgsShkKWeZ2iikUApyP8lhlxQBJw&s'}
          alt={listing.name}
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="w-5 h-5 text-green-700" />
            <p className="truncate text-sm font-semibold text-gray-600 w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-bold flex items-center gap-1">
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            <span className="text-slate-500">
              تومن
              {listing.type === "rent" && "/ماه"}
            </span>
          </p>
          <div className="text-slate-700 flex gap-4 mt-1">
            <div className="font-bold text-xs">
                {listing.bedrooms} خواب
            </div>
            <div className="font-bold text-xs">
                {listing.bathrooms} سرویس
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
