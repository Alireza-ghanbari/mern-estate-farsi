import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-4">
          <p className="mt-5">
            تماس با <span className="font-semibold">{landlord.username}</span>{" "}
            برای آگهی <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="پیام خود را وارد کنید"
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link to={`mailto:${landlord.email}?subject=${listing.name}&body=${message}`}
          className="bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-95">
            ارسال پیام
          </Link>
        </div>
      )}
    </>
  );
}
