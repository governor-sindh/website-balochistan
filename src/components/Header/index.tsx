"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/logo.png";
import ChakraMenu from "../ChakraMenu";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { CompulsoryData, tracks } from "@/data";

const navLinks = [
  { title: "home", link: "/", id: "1" },
  { title: "apply", link: "/apply", id: "3" },
  { title: "jobs", link: "/jobs", id: "4" },
  { title: "result", link: "/result", id: "2" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className={`fixed left-0 top-0 z-40 h-full w-full bg-main print:hidden ${
          !open && "hidden"
        }`}
      >
        <div className="absolute right-5 top-5 ">
          <RxCross1
            className="text-white"
            size={25}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="m-auto mt-20 flex w-[90%] flex-col text-base font-normal text-white">
          {navLinks.map((item) => (
            <Link href={item.link} onClick={() => setOpen(false)} key={item.id}>
              <div className="border-b border-[#1468a5] py-5 capitalize">
                {item.title}
              </div>
            </Link>
          ))}


          <div
            className={`py-5 ${!showMenu && "border-b"} border-[#1468a5]`}
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="flex items-center justify-between">
              Courses
              <IoIosArrowDown size={16} />
            </div>
          </div>

          <div
            className={`overflow-y-auto rounded-xl bg-[#216fa7] ${
              showMenu ? "h-[250px]" : "h-0 overflow-hidden"
            }`}
          >
            <h1 className="mt-3 px-2 text-center text-lg font-bold text-white">
              Core Courses
            </h1>
            {CompulsoryData.map((val, index) => {
              return (
                <Link
                  onClick={() => setOpen(false)}
                  key={index}
                  href={`/compulsory/${val.id}`}
                >
                  <div
                    className={`border-b border-[#3695d8] py-3 pl-2 text-sm text-white sm:text-base`}
                  >
                    {val.text}
                  </div>
                </Link>
              );
            })}
            <h1 className="mt-3 px-2 text-center text-lg font-bold text-white">
              Advanced Courses
            </h1>
            {tracks.map((val, index) => {
              return (
                <Link
                  onClick={() => setOpen(false)}
                  key={index}
                  href={`/tracks/${val.id}/4`}
                >
                  <div
                    className={`border-b border-[#3695d8] py-3 pl-2 text-sm text-white sm:text-base`}
                  >
                    {val.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-30 w-full bg-main backdrop-blur-3xl print:hidden">
        <div className="m-auto flex h-16 w-[95%] items-center justify-between md:h-20 lg:w-[90%] xl:w-[1300px]">
          <Link href={"/"}>
            <Image
              src={Logo}
              alt="logo"
              width={90}
              className="mt-14 w-[70px] sm:mt-20 sm:w-[80px] md:w-[90px]"
            />
          </Link>
          <h1 className="text_shadow hidden text-[15px] font-extrabold text-[#b9d8f3] lg:block xl-lg:text-xl xl:text-2xl">
            Tuition Free Education Program on Latest Technologies
          </h1>
          <h1 className="text_shadow text-[1.125rem] font-extrabold text-[#b9d8f3] lg:hidden">
            Tuition Free Program{" "}
          </h1>

          <div className="hidden items-center gap-5 text-[#FAF9F6] sm:flex lg:gap-10">
            {navLinks.map((item) => (
              <Link href={item.link} key={item.id}>
                <div className="menu_btns capitalize">{item.title}</div>
              </Link>
            ))}

            <ChakraMenu screen="large" open={open} setOpen={setOpen} />
          </div>
          <div className="block sm:hidden">
            <FiMenu
              size={24}
              className="text-white"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
