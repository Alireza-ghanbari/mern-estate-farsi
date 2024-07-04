import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prograss =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(prograss));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">پروفایل</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          className="hidden"
          ref={fileRef}
        />
        <img
          accept="image/*"
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2 border border-slate-300"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">  (حجم تصویر کمتر از دو مگابایت باشد) بارگذاری با خطا مواجه شد </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`بارگذاری ${filePerc}%`}</span>
          ) : (filePerc === 100 ) ? (
            <span className="text-green-700">تصویر با موفقیت بارگذاری شد</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="ایمیل"
          id="username"
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="نام کاربری"
          id="email"
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="گذرواژه"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">
          بروز رسانی
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">پاک کردن حساب</span>
        <span className="text-slate-700 cursor-pointer">خروج از حساب</span>
      </div>
    </div>
  );
}
