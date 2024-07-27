import React, { useEffect, useState } from 'react';
import { IoCaretDown } from "react-icons/io5";
import './NavBar.css';

const NavBar = () => {
  const items = ['Trang chủ', 'Tin Tức', 'Sự kiện', 'Hỗ trợ', 'Cộng đồng'];
  const [selectedItem, setSelectedItem] = useState(items[0]);

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
            >
              <div className={`floattop__nav--main--item flex ${item === "Cộng đồng" ? "flex-col" : "flex-row"} items-center justify-center`}>
                <span className={`uppercase font-bold text-lg px-4 rounded-3xl hover:bg-green-700 hover:text-white hover:cursor-pointer ${selectedItem === item ? "bg-green-700 text-white" : "text-green-950"}`}>{item}</span>
                {item === "Cộng đồng" && (<div><IoCaretDown className='m-0 p-0 absolute bottom-1'/></div>)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NavBar