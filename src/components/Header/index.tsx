"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/logo.png";
import ChakraMenu from "../ChakraMenu";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { CompulsoryData, tracks } from '@/data';


function Header() {
    const [open, setOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false)
    return (
        <>
            <div className={`fixed top-0 print:hidden left-0 w-full h-full bg-main z-40 ${!open && 'hidden'}`}>
                <div className='absolute top-5 right-5 '>
                    <RxCross1 className='text-white' size={25} onClick={() => setOpen(false)} />
                </div>
                <div className='w-[90%] m-auto mt-20 text-base text-white font-normal flex flex-col'>
                    <Link href={'/'} onClick={() => setOpen(false)}>
                        <div className='py-5 border-b border-[#1468a5]'>
                            Home
                        </div>
                    </Link>
                    <Link href={'/apply'} onClick={() => setOpen(false)}>
                        <div className='py-5 border-b border-[#1468a5]'>
                            Apply
                        </div>
                    </Link>
                    <div className={`py-5 ${!showMenu && 'border-b'} border-[#1468a5]`} onClick={() => setShowMenu(!showMenu)}>
                        <div className="flex justify-between items-center">
                            Courses
                            <IoIosArrowDown size={16} />
                        </div>
                    </div>
                    <div className={`bg-[#216fa7] overflow-y-auto rounded-xl ${showMenu ? 'h-[250px]' : 'h-0 overflow-hidden'}`}>
                        <h1 className='text-lg font-bold text-white px-2 mt-3 text-center'>Core Courses</h1>
                        {
                            CompulsoryData.map((val, index) => {
                                return (
                                    <Link onClick={() => setOpen(false)} key={index} href={`/compulsory/${val.id}`}><div className={`text-white sm:text-base border-b border-[#3695d8] py-3 text-sm pl-2`}>{val.text}</div></Link>
                                )
                            })
                        }
                        <h1 className='text-lg font-bold text-white px-2 mt-3 text-center'>Advanced Courses</h1>
                        {
                            tracks.map((val, index) => {
                                return (
                                    <Link onClick={() => setOpen(false)} key={index} href={`/tracks/${val.id}/4`}><div className={`text-white sm:text-base border-b border-[#3695d8] py-3 text-sm pl-2`}>{val.name}</div></Link>
                                )
                            })
                        }
                    </div>
                    <Link href={'/jobs'} onClick={() => setOpen(false)}>
                        <div className='py-5 border-b border-[#1468a5]'>
                            Jobs
                        </div>
                    </Link>
                </div>
            </div>
            <div className='w-full print:hidden bg-main sticky top-0 backdrop-blur-3xl z-30'>
                <div className='xl:w-[1300px] lg:w-[90%] w-[95%] m-auto flex justify-between items-center md:h-20 h-16'>
                    <Link href={'/'}><Image src={Logo} alt='logo' width={90} className='sm:mt-20 mt-14 md:w-[90px] sm:w-[80px] w-[70px]' /></Link>
                    <h1 className='xl:text-2xl xl-lg:text-xl text-[15px] font-extrabold text-[#ffffff] lg:block hidden text_shadow'>Tuition Free Education Program on Latest Technologies</h1>
                    <h1 className='text-[1.125rem] lg:hidden font-extrabold text-[#b9d8f3] text_shadow'>Tuition Free Program </h1>

                    <div className='sm:flex items-center hidden lg:gap-10 gap-5 text-[#FAF9F6]'>
                        <Link href={'/'}>
                            <div className='menu_btns'>
                                Home
                            </div>
                        </Link>

                        <Link href={'/apply'}>
                            <div className='menu_btns'>
                                Apply
                            </div>
                        </Link>

                        <ChakraMenu screen='large' open={open} setOpen={setOpen} />

                        <Link href={'/jobs'}>
                            <div className='menu_btns'>
                                Jobs
                            </div>
                        </Link>

                    </div>
                    <div className='sm:hidden block'>
                        <FiMenu size={24} className='text-white' onClick={() => setOpen(true)} />
                    </div>
                </div>
            </div>
        </>
    );

}

export default Header;