import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { PulseLoader } from "react-spinners";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [imgUploadError, setImgUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const handleImagesubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImgUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImgUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImgUploadError("تصاویر بارگذاری نشد");
          setUploading(false);
        });
    } else if (files.length + formData.imageUrls.length == 0) {
      setImgUploadError("تصاویر را انتخاب کنید");
      setUploading(false);
    } else if (files.length == 0) {
      setImgUploadError("تصاویر جدید را انتخاب کنید");
    } else {
      setImgUploadError("فقط میتوانید شش عکس بارگذاری کنید");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImg = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-5 md:px-12 max-w-7xl mx-auto pb-28 sm:pb-20">
      <h1 className="text-3xl font-semibold text-center my-7 mb-10">
        افزودن اگهی
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 lg:gap-7">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="نام"
            maxLength="62"
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            id="address"
            placeholder="نشانی"
            required
            className="border p-3 rounded-lg"
          />

          <textarea
            type="text"
            id="description"
            placeholder="توضیحات"
            required
            className="border p-3 rounded-lg"
          />

          <div className="flex gap-6 flex-wrap mt-3">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>فروشی</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>اجاره</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>پارکینگ</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>مبله شده</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>تخفیف دار</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-5">
            <div className="flex items-center gap-2">
              <p>تعداد اتاق خواب :</p>
              <input
                className="p-2 border border-gray-300 rounded-lg"
                type="number"
                id="bedrooms"
                min="0"
                max="9"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <p>تعداد سرویس بهداشتی :</p>
              <input
                className="p-2 border border-gray-300 rounded-lg"
                type="number"
                id="bathrooms"
                min="1"
                max="9"
                required
              />
            </div>
            <div className="flex xs:items-center items-start flex-col xs:flex-row gap-2">
              <div className="flex flex-col items-center">
                <p>قیمت :</p>
                <span className="text-xs">(تومن / ماه)</span>
              </div>
              <input
                className="p-2 border border-gray-300 rounded-lg"
                type="number"
                id="regularPrice"
                required
              />
            </div>
            <div className="flex xs:items-center items-start gap-2 flex-col xs:flex-row">
              <div className="flex flex-col justify-start xs:items-center flex-shrink-0">
                <p>قیمت با تخفیف :</p>
                <span className="text-xs">(تومن / ماه)</span>
              </div>
              <input
                min="1"
                max="1000000000000"
                className="py-2 px-1 border border-gray-300 rounded-lg"
                type="number"
                id="discountPrice"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4 ">
          <p className="font-semibold mt-2 sm:mt-0">
            عکس ها :
            <span className="font-normal text-gray-600 mr-2">
              اولین عکس پیش نمایش خواهد بود و حداکثر شش عکس
            </span>
          </p>
          <div className="flex gap-4 flex-col xs:flex-row">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              disabled={uploading || files.length == 0 }
              type="button"
              onClick={handleImagesubmit}
              className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-60"
            >
              {uploading ? (
                <div className="py-2 px-3 flex">
                  <PulseLoader size={5} />
                </div>
              ) : (
                "بارگذاری"
              )}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imgUploadError && imgUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImg(index)}
                  className="p-3 text-red-700 rounded-lg hover:opacity-85"
                >
                  پاک کردن
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
            بارگذاری آگهی
          </button>
        </div>
      </form>
    </main>
  );
}
