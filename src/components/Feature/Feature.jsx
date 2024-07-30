import React from 'react'
import DynamicImage from '../../utils/DynamicImage'
import background from '/bg-news.png';
import title from '/title-feature.png';

const Feature = () => {
    return (
        <section className='relative h-screen'>
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
            <div className='section__content w-full flex'>
            </div>
        </section>
    )
}

export default Feature