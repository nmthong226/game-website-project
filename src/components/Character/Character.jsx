import React, { useEffect, useState } from 'react'
import bg_character from '/bg-character.png';
import type_1 from '/type_1.png';
import type_2 from '/type_2.png';
import type_3 from '/type_3.png';
import type_4 from '/type_4.png';
import type_5 from '/type_5.png';
import type_6 from '/type_6.png';
import type_7 from '/type_7.png';
import type_border from '/type-border.png';
import DynamicImage from '../../utils/DynamicImage';
import character_decor from '/character_decor.png';
import decor_element from '/test-3.png';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimate, usePresence } from "framer-motion"
import { characterList } from '../../constants';

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
                <motion.div
                  className='relative left-[5%] space-y-4'>
                  <motion.img
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: "1", delay: "0.2" }}
                    src={character.name}
                    alt='icon'
                    className='h-[100px] ml-10' />
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: "1", delay: "0.4" }}
                    className='relative'>
                    <img
                      src={character.icon}
                      alt='icon'
                      className='h-[60px]' />
                    <span
                      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-xl text-[#123456] text-nowrap'>
                      Ngũ hành: {character.element}
                    </span>
                  </motion.div>
                  <motion.img
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: "1", delay: "0.6" }}
                    src={character.skill}
                    alt='icon'
                    className='h-[230px]' />
                  <motion.img
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: "1", delay: "0.8" }}
                    src={character.stats}
                    alt='icon'
                    className='h-[200px]' />
                </motion.div>
              </div>
            )
          })}
        </AnimatePresence>
        {characterList.map((character, index) => (
          <AnimatePresence key={index}>
            {currentCharacter === index && (
              <div className='section__content flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                <motion.img
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: "1", delay: "0.3" }}
                  src={character.image}
                  alt={`character-${index + 1}`}
                  className='h-[500px]'
                />
              </div>
            )}
          </AnimatePresence>
        ))}
        <div className='section__content flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='relative'>
            <img src={type_border} alt='character-1' className='h-full w-full' />
            {currentPositions.map((position, index) => (
              <img
                key={`${position.top}-${position.left}-${index}`}
                src={images[index]}
                alt={`type-${index + 1}`}
                className={`absolute hover:cursor-pointer ${animation ? 'pointer-events-none' : ''}`}
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