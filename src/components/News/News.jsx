import React, { useEffect, useState } from 'react'
import DynamicImage from '../../utils/DynamicImage'
import background from '/bg-news-2.png';
import news_placeholder_1 from '/news-1.png';
import news_placeholder_2 from '/news-2.png';
import news_placeholder_3 from '/news-3.png';
import news_placeholder_4 from '/news-4.png';
import { motion, useMotionValue } from 'framer-motion';
import './News.css';

const imgs = [
    news_placeholder_1,
    news_placeholder_2,
    news_placeholder_3,
    news_placeholder_4,
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

const News = () => {
    const [imgIndex, setImgIndex] = useState(0);
    const dragX = useMotionValue(0);
    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIndex((pv) => {
                    if (pv === imgs.length - 1) {
                        return 0;
                    }
                    return pv + 1;
                });
            }
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, []);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
            setImgIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
            setImgIndex((pv) => pv - 1);
        }
    };

    return (
        <section className='relative h-full'>
            <div className='section__background flex items-center justify-center'>
                <div>
                    <DynamicImage
                        src={background}
                        alt="banner"
                        originalWidth={2000}
                        originalHeight={800}
                        ratio={1}
                    />
                </div>
            </div>
            <div className='section__content absolute top-24 left-24'>
                <div className="relative overflow-hidden w-[660px] max-w-[660px] bg-[#fff8b9] rounded-3xl">
                    <motion.div
                        drag="x"
                        dragConstraints={{
                            left: 0,
                            right: 0,
                        }}
                        style={{
                            x: dragX,
                        }}
                        animate={{
                            translateX: `-${imgIndex * 100}%`,
                        }}
                        transition={SPRING_OPTIONS}
                        onDragEnd={onDragEnd}
                        className="flex cursor-grab items-center active:cursor-grabbing"
                    >
                        <Images imgIndex={imgIndex} />
                    </motion.div>
                    <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
                    <GradientEdges />
                </div>
            </div>
        </section>
    )
}

const Images = ({ imgIndex }) => {
    return (
        <>
            {imgs.map((imgSrc, idx) => {
                return (
                    <motion.div
                        key={idx}
                        style={{
                            backgroundImage: `url(${imgSrc})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        animate={{
                            scale: imgIndex === idx ? 0.95 : 0.94,
                        }}
                        transition={SPRING_OPTIONS}
                        className="aspect-video w-[660px] shrink-0 rounded-xl object-cover"
                    />
                );
            })}
        </>
    );
};

const Dots = ({ imgIndex, setImgIndex }) => {
    return (
        <div className="absolute flex w-full justify-center gap-2 bottom-2 right-0">
            {imgs.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-colors mb-2 ${idx === imgIndex ? "bg-[#ab2626] w-12" : "bg-neutral-50"
                            }`}
                    />
                );
            })}
        </div>
    );
};

const GradientEdges = () => {
    return (
        <>
            <div className="rounded-3xl pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
            <div className="rounded-3xl pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
        </>
    );
};

export default News