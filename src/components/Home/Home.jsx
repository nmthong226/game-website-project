import React from 'react'
import background from '/bg-official-3.png';
import rating from '/rating-18.png';
import DynamicImage from '../../utils/DynamicImage';
import logo from '/logo.png';
import logoHeader from '/logo-header-3.png';
import playButton from '/play-vid-button-2.png';
import topupButton from '/topup-button.png';
import downloadButtonApp from '/download-button-app.png';
import downloadButtonGPlay from '/download-button-gplay.png';
import downloadButtonAPK from '/download-button-apk.png';
import downloadButtonPC from '/download-button-pc.png';
import downloadButtonNox from '/download-button-nox.png';
import downloadButtonBstack from '/download-button-bstack.png';
import downloadButtonLD from '/download-button-ld.png';
import './Home.css';

const Home = () => {
    return (
        <section className="relative">
            <div className='section__background flex items-center justify-center'>
                <div>
                    <DynamicImage
                        src={background}
                        alt="banner"
                        originalWidth={2000}
                        originalHeight={1000}
                        ratio={1}
                    />
                </div>
            </div>
            <div className='section__content'>
                <div className='flex absolute top-0 left-0 p-4 px-20 space-x-2'>
                    <DynamicImage
                        src={logo}
                        alt='logo'
                        originalWidth={500}
                        originalHeight={500}
                        className={"rounded-xl border-4 border-white"}
                        ratio={0.05}
                    />
                    <DynamicImage
                        src={logoHeader}
                        alt='logo'
                        originalWidth={677}
                        originalHeight={288}
                        className={""}
                        ratio={0.1}
                    />
                </div>
                <div className='absolute top-0 right-0'>
                    <DynamicImage
                        src={rating}
                        alt='rating'
                        originalWidth={300}
                        originalHeight={180}
                        ratio={0.06}
                    />
                </div>
                <div className='bt-play absolute top-[135px] left-[640px] z-20'>
                    <DynamicImage
                        src={playButton}
                        alt='playButton'
                        originalWidth={500}
                        originalHeight={500}
                        ratio={0.04}
                    />
                </div>
                <div className='game__info flex absolute bottom-4 left-1/2 transform -translate-x-1/2 mb-4'>
                    <div className='flex'>
                        <div className='bt-topup p-1'>
                            <img src={topupButton} alt='topupButton' className='w-[140px] h-[140px] ml-20' />
                        </div>
                        <div className='bt-download-list-1 p-1 grid grid-cols-1 content-between'>
                            <img src={downloadButtonApp} alt='downloadButtonApp' className='bt-download-item h-[65px]' />
                            <img src={downloadButtonGPlay} alt='downloadButtonGPlay' className='bt-download-item h-[65px]' />
                        </div>
                        <div className='bt-download-list-2 p-1 grid grid-cols-1 content-between'>
                            <img src={downloadButtonAPK} alt='downloadButtonApp' className='bt-download-item h-[65px]' />
                            <img src={downloadButtonPC} alt='downloadButtonGPlay' className='bt-download-item h-[65px]' />
                        </div>
                        <div className='bt-download-list-2 p-1 grid grid-cols-1 content-between'>
                            <img src={downloadButtonNox} alt='downloadButtonApp' className='bt-download-item h-[40px]' />
                            <img src={downloadButtonBstack} alt='downloadButtonGPlay' className='bt-download-item h-[40px]' />
                            <img src={downloadButtonLD} alt='downloadButtonGPlay' className='bt-download-item h-[40px]' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home