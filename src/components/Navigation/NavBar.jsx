import React, { useEffect, useState } from 'react';
import { IoCaretDown } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { AiOutlineTikTok } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";
import navDecorLeft from '/nav-decor-left.png';
import navDecorRight from '/nav-decor-right.png';
import './NavBar.css';

const NavBar = () => {
  const items = ['Trang chủ', 'Tin Tức', 'Sự kiện', 'Hỗ trợ', 'Cộng đồng'];
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div
      className={`navbar flex w-full items-center justify-center`}
      style={{
        transform: `scale(1)`,
      }}>
      <div className="floattop__background bg-gradient-to-r from-[#c5ffbf]/90 to-[#acfffc]/90 rounded-b-3xl mx-auto w-[738px] h-[55px]" />
      <div className='floattop__content flex w-[738px] h-[55px] items-center justify-center'>
        <ul className='floattop__nav--main flex flex-row mx-auto'>
          {items.map((item, index) => (
            <li
              key={index}
              className='flex flex-row items-center'
              onClick={() => setSelectedItem(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className={`floattop__nav--main--item flex ${item === "Cộng đồng" ? "flex-col" : "flex-row"} items-center justify-center`}
              >
                <span className={`uppercase font-bold text-lg px-4 rounded-3xl ${selectedItem === item ? "bg-green-700 text-white" : "text-green-950"} ${hoveredItem === item && "bg-green-700 text-white cursor-pointer"}`}
                >
                  {item}
                </span>
                {item === "Cộng đồng" && (<div><IoCaretDown className='m-0 p-0 absolute bottom-0 text-lg text-green-700' /></div>)}
                {item === "Cộng đồng" && (
                  <div className='relative'>
                    {hoveredItem === "Cộng đồng" && (
                      <ul className='dropdown flex flex-col bg-green-600 w-52 absolute top-full mt-4 shadow-lg rounded-2xl py-4 border-2 border-white text-white'
                        style={{ left: '50%', transform: 'translateX(-50%)' }}>
                        <li className='item--menu px-4 py-2 hover:bg-green-400 hover:cursor-pointer'>
                          <div className='flex flex-row items-center'>
                            <FaFacebookF className='mr-2' />
                            Fanpage
                          </div>
                        </li>
                        <li className='item--menu px-4 py-2 hover:bg-green-400 hover:cursor-pointer'>
                          <div className='flex flex-row items-center'>
                            <IoLogoYoutube className='mr-2' />
                            Youtube
                          </div>
                        </li>
                        <li className='item--menu px-4 py-2 hover:bg-green-400 hover:cursor-pointer'>
                          <div className='flex flex-row items-center'>
                            <FaUserGroup className='mr-2' />
                            Group Cộng Đồng
                          </div>
                        </li>
                        <li className='item--menu px-4 py-2 hover:bg-green-400 hover:cursor-pointer'>
                          <div className='flex flex-row items-center'>
                            <AiOutlineTikTok className='mr-2' />
                            Tiktok
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NavBar