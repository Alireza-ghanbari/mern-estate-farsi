import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMdMore } from "react-icons/io";


export default function Navbar() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-2 sm:px-8">
        <ul className="sm:flex gap-12 items-center hidden text-lg">
          <Link to={"/sign-in"}>
            <li className="text-slate-700 hover:border-b border-black hover:text-black">
              ورود
            </li>
          </Link>
          <Link to={"/about"}>
            {" "}
            <li className="text-slate-700 hover:border-b border-black hover:text-black">
            
              درباره
            </li>
          </Link>
          <Link to={"/"}>
            <li className="text-slate-700 hover:border-b border-black hover:text-black">
              خانه
            </li>
          </Link>
        </ul>

        {/* mobile menu */}

        <ul className="sm:hidden  border-b-transparent border-[1px] xs:gap-12 gap-8 items-center justify-center w-full py-5 text-lg xs:text-xl bg-slate-200 flex fixed bottom-0 right-0 rounded-tr-full rounded-tl-full shadow-[0_25px_50px_15px_rgba(0,0,0,.4)]">
          <Link to={"/sign-in"}>
            <li className="text-slate-700 hover:text-black duration-300 flex gap-1 items-center">
                <FaUser />
              ورود
            </li>
          </Link>
          <Link to={"/about"}>
            {" "}
            <li className="text-slate-700 hover:text-black duration-300 flex  items-center gap-1">
            <FaLayerGroup />
              درباره
            </li>
          </Link>
          <Link to={"/"}>
            <li className="text-slate-700 hover:text-black duration-300 flex  gap-1">
              <FaHome />
              خانه
            </li>
          </Link>
        </ul>

        <form className="bg-slate-100 px-3 py-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="جستوجو ..."
            className="bg-transparent focus:outline-none w-20 xs:w-32 sm:w-32 md:w-44 lg:w-64"
          />
          <FaSearch />
        </form>

        <Link to={"/"}>
          <h1 className="font-bold text-lg xs:text-2xl md:text-3xl flex flex-wrap">
            <span className="text-slate-700">Estate</span>
            <span className="text-slate-500">Alireza</span>
          </h1>
        </Link>
      </div>
    </header>
  );
}
