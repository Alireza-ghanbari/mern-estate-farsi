import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
import {Link } from "react-router-dom"

export default function ListingPage() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);


  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }
      
      navigate('/')
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="pb-24">
      {loading && (
        <div className="flex justify-center items-center mt-32">
          <PulseLoader size={15} />
        </div>
      )}
      {error && (
        <p className=" text-center my-20 text-2xl">خطا در گرفتن اطلاعات !</p>
      )}

      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] -z-50"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="absolute top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            <FaShare className="text-slate-500" />
          </div>
          {copied && (
            <p className="absolute top-[9%] right-[5%] z-10 rounded-md bg-slate-100 p-2 text-sm">
              لینک کپی شد
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-xl sm:text-2xl font-semibold">
              <span className="block w-full xs:hidden mb-2">
                {listing.name}
              </span>
              <div className="flex gap-2">
                <span className="hidden xs:flex">{listing.name} - </span>
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " تومن/ ماه"}
              </div>
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4 flex-wrap">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "اجاره" : "فروشی"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {(
                    listing.regularPrice - listing.discountPrice
                  ).toLocaleString("en-US")}{" "}
                  تخفیف
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">توضیحات - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms} خواب
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms} سرویس
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "پارکینگ" : "بدون پارکینگ"}
              </li>
              {listing.furnished && (
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  <span>مبله</span>
                </li>
              )}
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg hover:opacity-95 p-3 mt-5"
              >
                تماس با مالک
              </button>
            )}
            {contact && <Contact listing={listing} />}

            {listing.userRef === currentUser?._id && (
              <div className=" flex gap-4 mt-5">
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 font-bold text-lg">ویرایش</button>
                </Link>
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700 font-bold text-lg"
                >
                  پاک کردن
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
