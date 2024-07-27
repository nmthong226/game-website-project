import React from 'react'
import background from '/bg-official-3.png';
import rating from '/rating-18.png';
import DynamicImage from '../../utils/DynamicImage';
import logo from '/logo.png';
import logoHeader from '/logo-header-3.png';
import './Home.css';

const Home = () => {
    return (
        <section>
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
                        ratio={0.08}
                    />
                </div>
            </div>

        </section>
    )
}

export default Home