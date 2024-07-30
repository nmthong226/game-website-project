import React from 'react';
import topupButton from '/topup-button.png';
import sidebarBG from '/sidebar.png';
import downloadButtonAppMini from '/sidebar-dl-button-app.png';
import downloadButtonGPlayMini from '/sidebar-dl-button-gplay.png';
import downloadButtonAPKMini from '/sidebar-dl-button-apk.png';
import downloadButtonPCMini from '/sidebar-dl-button-pc.png';
import navButtonFB from '/sidebar-nav-fb.png';
import navButtonTiktok from '/sidebar-nav-tiktok.png';
import navButtonYtb from '/sidebar-nav-ytb-2.png';
import navButtonGroup from '/sidebar-nav-group.png';
import navButtonTop from '/nav-button-top.png';
import './Sidebar.css'
import { Link } from 'react-scroll';

const Sidebar = () => {
    return (
        <div className='sidebar flex fixed top-1/2 right-0 transform -translate-y-1/2 z-50'>
            <div className='relative'>
                <img src={sidebarBG} alt='sidebar' className='w-40 z-10' />
                <div className='flex flex-col absolute top-[35%] right-[28px] transform -translate-y-1/2'>
                    <div className='sidebar__item'>
                        <img src={topupButton} alt='topupButton' className='w-[100px] h-[100px] z-[11]' />
                    </div>
                    <div className='sidebar__list space-y-2'>
                        <img src={downloadButtonAppMini} alt='topupButton' className='sidebar__item h-[38px] z-[11]' />
                        <img src={downloadButtonGPlayMini} alt='topupButton' className='sidebar__item h-[30px] z-[11]' />
                        <img src={downloadButtonAPKMini} alt='topupButton' className='sidebar__item h-[30px] z-[11]' />
                        <img src={downloadButtonPCMini} alt='topupButton' className='sidebar__item h-[39px] z-[11]' />
                    </div>
                </div>
                <div className='flex flex-col absolute top-[74%] right-[35px] transform -translate-y-1/2 space-y-2'>
                    <div className='flex flex-row space-x-4'>
                        <img src={navButtonFB} alt='topupButton' className='sidebar__item h-[40px] z-[11]' />
                        <img src={navButtonGroup} alt='topupButton' className='sidebar__item h-[40px] z-[11]' />
                    </div>
                    <div className='flex flex-row space-x-4'>
                        <img src={navButtonTiktok} alt='topupButton' className='sidebar__item h-[40px] z-[11]' />
                        <img src={navButtonYtb} alt='topupButton' className='sidebar__item h-[40px] z-[11]' />
                    </div>
                </div>
                <div className='flex flex-col absolute top-[91%] right-[55px] transform -translate-y-1/2 space-y-2'>
                    <Link
                        to='/home'
                        smooth={true}
                        duration={500}
                        spy={true}
                        activeClass="active"
                    >
                        <img src={navButtonTop} alt='topupButton' className='sidebar__item h-[35px] z-[11]' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar