import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className=" p-3 xs:p-7 border-b-2 lg:border-r-2 lg:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">نام آگهی :</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="جستوجو کنید"
              className="border rounded-lg p-3 w-full whitespace-nowrap"
            />
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold">نوع آگهی :</label>
            <div className="flex gap-2">
              <span>فروش و اجاره</span>
              <input type="checkbox" id="all" className="w-5" />
            </div>
            <div className="flex gap-2">
              <span>اجاره</span>
              <input type="checkbox" id="rent" className="w-5" />
            </div>
            <div className="flex gap-2">
              <span>فروش</span>
              <input type="checkbox" id="sale" className="w-5" />
            </div>
            <div className="flex gap-2">
              <span>تخفیف دار</span>
              <input type="checkbox" id="offer" className="w-5" />
            </div>
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold">امکانات :</label>
            <div className="flex gap-2">
              <span>پارکینگ</span>
              <input type="checkbox" id="parking" className="w-5" />
            </div>
            <div className="flex gap-2">
              <span>مبله</span>
              <input type="checkbox" id="furnished" className="w-5" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">مرتب سازی :</label>
            <select id="sort_order" className="border rounded-lg px-2 py-1">
              <option>بیشترین قیمت</option>
              <option>کمترین قیمت</option>
              <option>جدید ترین</option>
              <option>قدیمی ترین</option>
            </select>
          </div>

          <button className="bg-slate-700 p-3 hover:opacity-95 rounded-lg text-white">
            جستوجو
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-2xl font-semibold border-b p-3 text-slate-700 lg:mt-5">نتایج :</h1>
      </div>
    </div>
  );
}
