import Image from "next/image";
import React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Cover from "../../../public/cover.png";
import { Counter } from "../Counter";

const poppins = Poppins({
  weight: ["300", "400", "500", "800", "900"],
  subsets: ["latin"],
});

function Hero() {
  return (
    <div
      className={` relative z-0 w-full overflow-hidden bg-opacity-75 bg-[url('/bg_house.jpg')] bg-cover ${poppins.className}`}
    >
      <div className=" absolute inset-0 -z-50 h-full w-full bg-zinc-100 bg-opacity-80"></div>

      <div className=" z-50 m-auto mt-6 block w-[95%] items-center   justify-between md:flex md:flex-row lg:w-[90%] xl:w-[1300px] ">
        <div className=" h-fit w-full pt-5 md:w-1/2 md:py-10 ">
          <h1 className="lg:whitespace-nowrap text-center text-[2rem] font-extrabold leading-10 tracking-wider text-main sm:text-5xl sm:leading-none md:text-left lg:text-6xl">
            Governor Balochistan
          </h1>
          <h2 className=" whitespace-nowrap text-center text-[1.5rem] font-normal leading-[2rem] tracking-wider  text-main sm:text-4xl sm:leading-[3rem] md:text-left lg:text-[2.5rem]">
            Abdul Wali Kakar
          </h2>
          <h2 className="mt-5 whitespace-nowrap text-center text-[1.5rem] font-semibold leading-[2rem] tracking-wider  text-sub sm:text-4xl sm:leading-[3rem] md:text-left lg:text-[2.5rem]">
            Initiative for
            <br />
            Artificial Intelligence,
            <br />
            Web 3.0 & Metaverse
          </h2>
          <p className=" my-5 whitespace-nowrap text-center text-[1.25rem] font-extrabold text-main sm:text-2xl md:text-left">
            Earn up to $5,000 / month
          </p>
          <p className="  my-5 w-full text-center text-[1.125rem] tracking-wider text-main sm:text-xl md:w-[80%] md:text-left">
            Opening the Governor House and Removing Barriers to Educate the
            Youth of Balochistan.
          </p>
          <div className="mb-7 mt-5 flex flex-col items-center sm:mt-10 sm:flex-row sm:gap-5 md:mb-0">
            <Link className="w-full md:w-auto" href={"/apply"}>
              <button className="w-full rounded-md bg-main py-3 text-center text-sm font-semibold tracking-widest text-white transition-all hover:translate-y-1 sm:py-4 sm:text-base md:w-52">
                APPLY NOW
              </button>
            </Link>
            {/* <Counter /> */}
          </div>
        </div>
        <div className=" relative  mt-7 flex w-full items-end justify-center md:m-auto md:justify-end ">
          <Image
            src={Cover}
            alt="piaic"
            className="ml-12 md:ml-10 h-auto min-w-[500px] md:min-w-[800px] lg:min-w-[900px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
