import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { UserAuth } from "../../context/authContext";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = UserAuth();

  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "30vw",
          minWidth: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "20vw",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[49] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[49]  overflow-hidden md:relative fixed h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            src={logo}
            alt=""
            className={`rounded-full bg-black ${
              open
                ? "w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
                : "w-[32px] h-[32px]"
            }`}
          />
          {open && (
            <span className="text-xs sm:text-sm lg:text-lg xl:text-xl whitespace-pre">
              MonkeyMonk
            </span>
          )}
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100  md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/dashboard"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/profile"} className="link">
                <BsPerson size={23} className="min-w-max" />
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={"/chat"} className="link">
                <HiOutlineDatabase size={23} className="min-w-max" />
                Chat
              </NavLink>
            </li>
            <div className="h-[1px] bg-slate-300 w-full my-2"></div>
            <li>
              <NavLink to={"/planner"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Planner
              </NavLink>
            </li>

            <li className="" onClick={handleLogout}>
              <NavLink to={"/"} className="link">
                <FiLogOut size={23} className="min-w-max" />
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: 0,
                  y: 0,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute bg-slate-400 rounded-full p-2 w-fit h-fit md:block z-50  right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
