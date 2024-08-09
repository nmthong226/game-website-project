import React, { useEffect, useState } from 'react'
import bg_character from '/bg-character.png';
import type_1 from '/type_1.png';
import type_2 from '/type_2.png';
import type_3 from '/type_3.png';
import type_4 from '/type_4.png';
import type_5 from '/type_5.png';
import type_6 from '/type_6.png';
import type_7 from '/type_7.png';
import character_1 from '/character-1.png';
import character_2 from '/character-2.png';
import character_3 from '/character-3-2.png';
import character_4 from '/character-4.png';
import character_5 from '/character-5-2.png';
import character_6 from '/character-6.png';
import character_7 from '/character-7.png';
import type_border from '/type-border.png';

import tl_icon from '/tl-icon.png';
import tl_name from '/tl-name.png';
import tl_stats from '/tl-stats.png';
import tl_skill from '/tl-skill.gif';

import nd_icon from '/nd-icon.png';
import nd_name from '/nd-name-2.png';
import nd_stats from '/nd-stats.png';
import nd_skill from '/nd-skill.gif';

import mg_icon from '/mg-icon.png';
import mg_name from '/mg-name.png';
import mg_stats from '/mg-stats.png';
import mg_skill from '/mg-skill.gif';

import vd_icon from '/vd-icon.png';
import vd_name from '/vd-name.png';
import vd_stats from '/vd-stats.png';
import vd_skill from '/vd-skill.gif';

import nm_icon from '/nm-icon.png';
import nm_name from '/nm-name.png';
import nm_stats from '/nm-stats.png';
import nm_skill from '/nm-skill.gif';

import cb_icon from '/cb-icon.png';
import cb_name from '/cb-name.png';
import cb_stats from '/cb-stats.png';
import cb_skill from '/cb-skill.gif';

import tn_icon from '/tn-icon.png';
import tn_name from '/tn-name.png';
import tn_stats from '/tn-stats.png';
import tn_skill from '/tn-skill.gif';

import DynamicImage from '../../utils/DynamicImage';
import character_decor from '/character_decor.png';
import decor_element from '/test-3.png';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimate, usePresence } from "framer-motion"

const positions = [
  { top: '7%', left: '68%', height: '0px' },
  { top: '15%', left: '82%', height: '60px' },
  { top: '30%', left: '94%', height: '80px' },
  { top: '50%', left: '98%', height: '120px' },
  { top: '70%', left: '94%', height: '80px' },
  { top: '85%', left: '82%', height: '60px' },
  { top: '95%', left: '68%', height: '0px' },
];
const images = [type_7, type_1, type_2, type_3, type_4, type_5, type_6];

const generateKeyframes = (positions) => {
  return positions.map((_, index) => {
    const from = positions[index];
    const to = positions[(index + 1) % positions.length];
    return `
      @keyframes move-${index} {
        from {
          top: ${from.top};
          left: ${from.left};
          height: ${from.height};
        }
        to {
          top: ${to.top};
          left: ${to.left};
          height: ${to.height};
        }
      }
    `;
  }).join("\n");
};

const injectKeyframes = (positions) => {
  const keyframes = generateKeyframes(positions);
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);
};

const fadeInVariants = () => ({
  hidden: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.5 } },
  exit: { opacity: 0, x: -50 }
})

const Character = () => {
  const [animation, setAnimate] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState(4);
  const [currentPositions, setCurrentPositions] = useState(positions);

  useEffect(() => {
    injectKeyframes(currentPositions);
  }, [currentPositions]);

  const handleSelect = (index) => {
    setAnimate(true);
    setCurrentCharacter(index);
    // Reset animation state after the animation duration
    setTimeout(() => {
      setAnimate(false);
      setCurrentPositions(currentPositions.map((_, index) => {
        const to = currentPositions[(index + 1) % currentPositions.length];
        return { ...to };
      }));
    }, 2000);
  };

  const characterList = [
    {
      index: 0,
      icon: cb_icon,
      name: cb_name,
      element: 'Hỏa',
      stats: cb_stats,
      skill: cb_skill,
    },
    {
      index: 1,
      icon: tn_icon,
      name: tn_name,
      element: 'Hỏa',
      stats: tn_stats,
      skill: tn_skill,
    },
    {
      index: 2,
      icon: tl_icon,
      name: tl_name,
      element: 'Thổ',
      stats: tl_stats,
      skill: tl_skill,
    },
    {
      index: 3,
      icon: mg_icon,
      name: mg_name,
      element: 'Mộc',
      stats: mg_stats,
      skill: mg_skill,
    },
    {
      index: 4,
      icon: nd_icon,
      name: nd_name,
      element: 'Mộc',
      stats: nd_stats,
      skill: nd_skill,
    },
    {
      index: 5,
      icon: vd_icon,
      name: vd_name,
      element: 'Thổ',
      stats: vd_stats,
      skill: vd_skill,
    },
    {
      index: 6,
      icon: nm_icon,
      name: nm_name,
      element: 'Thủy',
      stats: nm_stats,
      skill: nm_skill,
    }
  ]
  return (
    <section className='relative h-screen'>
      <div className='section__background flex items-center justify-center'>
        <div>
          <DynamicImage
            src={bg_character}
            alt="banner"
            originalWidth={2000}
            originalHeight={1000}
            ratio={1}
          />
        </div>
      </div>
      <div className='section__content '>
        <AnimatePresence>
          {characterList.map((character, index) => {
            if (index !== currentCharacter) return null;
            return (
              <div
                key={index}
                className={`section__content flex flex-row absolute top-1/2 transform -translate-y-1/2 z-10 ${currentCharacter === index ? '' : 'hidden'}`}
              >
                <img
                  src={decor_element}
                  alt="character-6"
                  className="h-[780px]"
                />
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: "1" }}
                  className='absolute mt-10 left-[5%] space-y-4'>
                  <img
                    src={character.name} 
                    alt='icon' 
                    className='h-[100px] ml-10' />
                  <div
                    className='relative'>
                    <img
                      src={character.icon}
                      alt='icon'
                      className='h-[60px]' />
                    <span
                      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-xl text-[#123456] text-nowrap'>
                      Ngũ hành: {character.element}
                    </span>
                  </div>
                  <img
                    src={character.skill}
                    alt='icon'
                    className='h-[230px]' />
                  <img
                    src={character.stats}
                    alt='icon'
                    className='h-[200px]' />
                </motion.div>
              </div>
            )
          })}
        </AnimatePresence>
        <AnimatePresence>
          {currentCharacter === 0 &&
            <div className='section__content flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: "1" }}
                src={character_6}
                alt='character-6'
                className='h-[500px]'
              />
            </div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {currentCharacter === 1 &&
            <div className='section__content flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: "1" }}
                src={character_7}
                alt='character-7'
                className='h-[500px]'
              />
            </div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {currentCharacter === 2 &&
            <div className='flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: "1" }}
                src={character_2}
                alt='character-2'
                className='h-[500px]'
              />
            </div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {currentCharacter === 3 &&
            <div className='flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: "1" }}
                src={character_1}
                alt='character-1'
                className='h-[500px]'
              />
            </div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {currentCharacter === 4 &&
            <div className='flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: "1" }}
                src={character_4}
                alt='character-4'
                className='h-[500px]'
              />
            </div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {currentCharacter === 5 &&
            <div className='flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: "1" }}
                src={character_3}
                alt='character-3'
                className='h-[500px]'
              />
            </div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {currentCharacter === 6 &&
            <div className='section__content flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: "1" }}
                src={character_5}
                alt='character-5'
                className='h-[475px]'
              />
            </div>
          }
        </AnimatePresence>
        <div className='section__content flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='relative'>
            <img src={type_border} alt='character-1' className='h-full w-full' />
            {currentPositions.map((position, index) => (
              <img
                key={`${position.top}-${position.left}-${index}`}
                src={images[index]}
                alt={`type-${index + 1}`}
                className={`absolute hover:cursor-pointer`}
                style={{
                  ...position,
                  transform: 'translate(-50%, -50%)',
                  animationName: animation ? `move-${index}` : 'none',
                  animationDuration: '2s',
                  animationFillMode: 'forwards',
                }}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Character;