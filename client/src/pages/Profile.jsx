import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        dispatch(updateUserFailure(data.error));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.error) {
        dispatch(deleteUserFailure(data.error));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.error) {
        dispatch(signOutUserFailure(data.error));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (!res.ok) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

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

      setUserListings((perv) =>
        perv.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">پروفایل</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          className="hidden"
          ref={fileRef}
        />
        <img
          accept="image/*"
          onClick={() => fileRef.current.click()}
          src={formData?.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2 border border-slate-300"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              {" "}
              (حجم تصویر کمتر از دو مگابایت باشد) بارگذاری با خطا مواجه شد{" "}
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`بارگذاری ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">تصویر با موفقیت بارگذاری شد</span>
          ) : (
            ""
          )}
        </p>
        <input
          onChange={handleChange}
          defaultValue={currentUser.email}
          type="text"
          placeholder="ایمیل"
          id="email"
          className="border p-3 rounded-lg"
        />

        <input
          onChange={handleChange}
          defaultValue={currentUser.username}
          type="text"
          placeholder="نام کاربری"
          id="username"
          className="border p-3 rounded-lg"
        />

        <input
          onChange={handleChange}
          type="password"
          placeholder="گذرواژه"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80 flex items-center justify-center min-h-12"
        >
          {loading ? <PulseLoader size={10} /> : "بروز رسانی"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white p-3 rounded-lg text-center hover:opacity-95"
        >
          افزودن اگهی
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          پاک کردن حساب
        </span>
        <span onClick={handleSignOut} className="text-slate-700 cursor-pointer">
          خروج از حساب
        </span>
      </div>

      <p className="text-red-700 mt-5">{error && error}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess &&
        (formData.email || formData.username || formData.password)
          ? "اطلاعات بروز رسانی شد"
          : ""}
      </p>
      <button onClick={handleShowListing} className="text-green-700 w-full">
        نمایش آگهی ها
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? "خطا در نمایش آگهی ها" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className=" flex flex-col gap-4 pb-24">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            آگهی های شما
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing image"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="flex-1 text-slate-700 font-semibold hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700"
                >
                  پاک کردن
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700">ویرایش</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
