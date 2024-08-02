import React, { useEffect, useState } from 'react'
import DynamicImage from '../../utils/DynamicImage'
import background from '/bg-news.png';
import feature_1 from '/Background_1.jpg';
import feature_2 from '/Background_2.jpg';
import feature_3 from '/Background_3.jpg';
import feature_4 from '/Background_4.jpg';
import feature_5 from '/Background_5.jpg';
import { motion, useMotionValue } from 'framer-motion';
import frameFeature from '/FrameFeature.png';

const imgs = [
    feature_1,
    feature_2,
    feature_3,
    feature_4,
    feature_5
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 0;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};


const Feature = () => {
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
        if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) { //Move left in the list
            setImgIndex((pv) => pv + 1);
        }
        else if (x >= DRAG_BUFFER && imgIndex > 0) { //Move right in the list
            setImgIndex((pv) => pv - 1);
        }
        else if (x <= -DRAG_BUFFER && imgIndex === imgs.length - 1) { //Move right from the last to the first of list
            setImgIndex(0);
        }
        else if (x >= -DRAG_BUFFER && imgIndex === 0) { //Move left from the first to the last of list
            setImgIndex(imgs.length - 1);
        }
    };
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
            <div className='section__content flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                <div className="relative w-[1000px] max-w-[1000px]">
                    <img src={frameFeature} alt='news-bg' className="absolute w-full object-fit" />
                    <div className="news__carousel top-[60px] left-[120px] relative overflow-hidden w-[800px] max-w-[800px] rounded-3xl">
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
                        {/* <GradientEdges /> */}
                    </div>
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
                        className="aspect-video w-[800px] shrink-0 rounded-xl object-cover"
                    />
                );
            })}
        </>
    );
};

const Dots = ({ imgIndex, setImgIndex }) => {
    return (
        <div className="absolute flex w-full justify-center gap-2 bottom-4 right-0">
            {imgs.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`h-3 rounded-full mb-2 ${idx === imgIndex ? "bg-[#ab2626] w-12" : "bg-neutral-50 w-3"}`}
                    />
                );
            })}
        </div>
    );
};

const GradientEdges = () => {
    return (
        <>
            <div className="rounded-3xl rounded-r-none pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
            <div className="rounded-3xl rounded-l-none pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
        </>
    );
};

export default Feature