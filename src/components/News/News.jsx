import React, { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion';
import { format } from 'date-fns';
import { IoSearch } from "react-icons/io5";
import { newsList } from "../../constants/index";
import DynamicImage from '../../utils/DynamicImage';
import headerBG from '/news-header-bg.png';
import { parseDMY } from '../../utils';
import background from '/bg-news-2.png';
import news_placeholder_1 from '/news-1.png';
import news_placeholder_2 from '/news-2.png';
import news_placeholder_3 from '/news-3.png';
import news_placeholder_4 from '/news-4.png';
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
    const items = ['Tin tức', 'Sự kiện', 'Tính năng', 'Hướng dẫn'];
    const [imgIndex, setImgIndex] = useState(0);
    const [headerNews, setHeaderNews] = useState(items[0]);
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

    const [news, setNews] = useState([]);
    const getNewsList = (header) => {
        const filterNews = newsList.filter((oneNews) => oneNews.type === header).slice(0, 7);
        let sortedNews = filterNews.sort((a, b) => new Date(...b.date.split('/').reverse()) - new Date(...a.date.split('/').reverse()))
        setNews(sortedNews);
    }

    useEffect(() => {
        getNewsList(headerNews);
    }, [headerNews]);

    return (
        <section className='relative h-full'>
            <div className='section__background flex items-center justify-center'>
                <div>
                    <DynamicImage
                        src={background}
                        alt="banner"
                        originalWidth={2000}
                        originalHeight={640}
                        ratio={1}
                    />
                </div>
            </div>
            <div className="section__content flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="news__carousel relative overflow-hidden w-[660px] max-w-[660px] bg-[#fff8b9] rounded-3xl">
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
                <div className="news__content flex flex-col max-w-[600px]">
                    <div className='news__header flex flex-row px-4 text-lg mb-2'>
                        {items.map((header, index) => (
                            <div className={`relative flex group hover:text-white text-[#1F978C] w-32 hover:cursor-pointer ${header === headerNews ? "text-white" : ""}`} key={index} onClick={() => setHeaderNews(header)}>
                                <img src={headerBG} alt='header-1' className={`w-full opacity-0 group-hover:opacity-100 ${header === headerNews ? "opacity-100" : ""}`} />
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold z-10 whitespace-nowrap">{header}</p>
                            </div>
                        ))}
                    </div>
                    <div className='news__container flex flex-col px-4 justify-between h-[320px]'>
                        <div className='news__content'>
                            {news.map((oneNews, index) => (
                                <div className='news__info flex flex-row w-full justify-between border-b border-gray-200 px-2 py-2 font-semibold' key={index}>
                                    <p className='text-sm'>{oneNews.name}</p>
                                    <p className='text-sm'>{format(parseDMY(oneNews.date), "dd-MM")}</p>
                                </div>
                            ))}
                        </div>
                        <div className='news__searchbox flex'>
                            <input className='bg-white border py-2 w-[90%] px-2 text-sm' placeholder='Nhập tiêu đề sự kiện cần tìm' />
                            <button className='bg-[#1F978C] py-2 w-[10%] flex items-center justify-center'>
                                <IoSearch className='text-white size-6' />
                            </button>
                        </div>
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

export default News