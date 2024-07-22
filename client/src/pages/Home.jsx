import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [offer, setOffer] = useState([]);
  const [sale, setSale] = useState([]);
  const [rent, setRent] = useState([]);
  const [modal, setModal] = useState(true);

  SwiperCore.use([Navigation]);

  setTimeout(()=>{
    setModal(false)
  },[4000])

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=3`);
        const data = await res.json();
        setOffer(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=3`);
        const data = await res.json();
        setRent(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=3`);
        const data = await res.json();
        setSale(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-2 xs:px-2 sm:px-8 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          خانه ی خود را با ما به <span className="text-slate-500">راحتی</span>{" "}
          پیدا کنید
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          این وبسایت برای انتخاب محل بعدی سکونت شما بهرین و راحت ترین گزینه است.
          <br />
          ما تعداد زیادی از پیشنهاد ها برای شما فراهم کرده ایم
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          یافتن آگهی مورد نظر
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offer &&
          offer.length > 0 &&
          offer.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/*  */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offer && offer.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 my-1">
                تخفیف های اخیر
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-blue-800 hover:underline"
              >
                نمایش تخفیف ها
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {offer.map((listing, index) => (
                <ListingCard listing={listing} key={index} />
              ))}
            </div>
          </div>
        )}

        {rent && rent.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 my-1">
                اجاره های اخیر
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-sm text-blue-800 hover:underline"
              >
                نمایش آگهی های اجاره
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {rent.map((listing, index) => (
                <ListingCard listing={listing} key={index} />
              ))}
            </div>
          </div>
        )}

        {sale && sale.length > 0 && (
          <div className="pb-20">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 my-1">
                فروشی های اخیر
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-sm text-blue-800 hover:underline"
              >
                نمایش آگهی های فروش
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {sale.map((listing, index) => (
                <ListingCard listing={listing} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Link to={'/create-listing'} className="fixed sm:bottom-14 bottom-16 sm:left-8 left-4 z-50 p-3 bg-blue-800 rounded-xl cursor-pointer hover:opacity-90 hidden xs:inline-block">
        <FaPlus color="white" size={24} onMouseOver={() => setModal(true)} />
      </Link>
      {modal && <div className=" fixed sm:bottom-28 bottom-[118px] sm:left-8 left-4 z-50 px-3 py-2 rounded-tl-lg rounded-br-lg bg-white border border-slate-300 shadow-md">افزودن آگهی</div>}
    </div>
  );
}
