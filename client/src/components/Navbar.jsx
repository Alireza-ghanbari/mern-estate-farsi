import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermForUrl = urlParams.get("searchTerm");
    if (searchTermForUrl) {
      setSearchTerm(searchTermForUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-2 sm:px-8">
        <Link to={"/"}>
          <h1 className="font-bold text-lg xs:text-2xl md:text-3xl flex flex-wrap">
            <span className="text-slate-700">Estate</span>
            <span className="text-slate-500">Alireza</span>
          </h1>
        </Link>

        {/* mobile menu */}

        <ul className="sm:hidden  border-b-transparent border-[1px] xs:gap-12 gap-6 items-center justify-center w-full py-3 text-lg xs:text-xl bg-slate-200 flex fixed bottom-0 right-0 rounded-tr-full rounded-tl-full shadow-[0_25px_50px_15px_rgba(0,0,0,.4)] z-50">
          <Link to={"/"}>
            <li className="text-slate-700 hover:text-black duration-300 flex  gap-1">
              <FaHome />
              خانه
            </li>
          </Link>
          <Link to={"/about"}>
            {" "}
            <li className="text-slate-700 hover:text-black duration-300 flex  items-center gap-1">
              <FaLayerGroup />
              درباره
            </li>
          </Link>

          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                className="rounded-full h-7 w-7 object-cover"
              />
            ) : (
              <li className="text-slate-700 hover:text-black duration-300 flex gap-1 items-center">
                <FaUser />
                ورود
              </li>
            )}
          </Link>
        </ul>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 px-3 py-2 rounded-lg flex items-center"
        >
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="جستوجو ..."
            className="bg-transparent focus:outline-none w-20 xs:w-32 sm:w-32 md:w-44 lg:w-64"
          />
          <button>
            <FaSearch />
          </button>
        </form>

        <ul className="sm:flex gap-12 items-center hidden text-lg">
          <Link to={"/"}>
            <li className="text-slate-700 hover:border-b border-black hover:text-black">
              خانه
            </li>
          </Link>
          <Link to={"/about"}>
            {" "}
            <li className="text-slate-700 hover:border-b border-black hover:text-black">
              درباره
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                className="rounded-full h-7 w-7 object-cover"
              />
            ) : (
              <li className="text-slate-700 hover:border-b border-black hover:text-black">
                ورود
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
