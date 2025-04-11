import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { data } from '../assets/news';
import SplitText from './SplitText';
import { useRef } from 'react';

export default function News() {
  const titleContainer = useRef();
  let index = 0;
  useGSAP(() => {
    const images = gsap.utils.toArray('.news-image'),
      texts = gsap.utils.toArray('.news-text-animation');
    ScrollTrigger.create({
      trigger: '#news',
      pin: true,
      start: 'top top',
      end: '+=' + images.length * 60 + '%' + 'bottom',
      // markers: true,
      scrub: true,
      onUpdate: (e) => update(e),
    });
    const update = (e) => {
        images.forEach((el, id) => {
          let progress =
            // Math.floor(
            Math.max(0, e.progress * (images.length - 1) - (id - 1));
          // );
          gsap.to(el, {
            translateZ: (progress - 1) * -100 + 'px',
            translateY: (progress - 1) * -10 + '%',
            top: progress > 0 ? 0 : '100%',
          });

          if (
            (progress > 0 && id > index) ||
            (progress == 0 && id - 1 < index)
          ) {
            index =
              progress > 0 && id > index
                ? id
                : progress == 0 && id - 1 < index && id - 1;
            gsap.to('#counterId', {
              translateY: index * -100 + '%',
              duration: 1,
              ease: 'circ.out',
            });
            updateTexts();
          }
        });
      },
      updateTexts = () => {
        texts.forEach((el, id) => {
          if (id <= (index + 1) * 2 - 1 && id % 2 === 0)
            gsap.to([el, texts[id + 1]], {
              translateY: '0',
              opacity: 1,
              duration: 0.6,
              delay: 0.3,
              ease: 'power1.out',
              stagger: 0.2,
            });
          else if (id % 2 === 0)
            gsap.to([el, texts[id + 1]], {
              translateY: '100',
              opacity: 0,
              duration: 0.6,
              delay: 0.3,
              ease: 'power1.out',
              stagger: 0.2,
            });
        });
      };
    updateTexts();
    gsap.from('.titleChars', {
      scrollTrigger: {
        trigger: titleContainer.current,
        start: '120 bottom',
        toggleActions: 'play none none reverse',
        // markers: true,
      },
      yPercent: 200,
      stagger: 0.03,
      duration: 0.75,
      ease: 'circ.out',
    });
  });
  return (
    <section
      id='news'
      className='relative flex w-full h-full content-center items-center justify-around'
    >
      <div className='hidden md:flex flex-col text-base h-6 overflow-hidden text-on-surface-2'>
        {data.map((el, id) => (
          <p key={id} id='counterId'>
            {id + 1 < 10 ? '0' + (id + 1) : id + 1}
          </p>
        ))}
      </div>
      <div className='relative flex flex-col w-[85vw] md:w-[75vw] h-full content-center items-center justify-end gap-6'>
        <div ref={titleContainer}>
          <SplitText
            animationClass='titleChars'
            className='text-[8vw] sm:text-[6vw] text-on-surface-2'
          >
            Quoi de neuf?
          </SplitText>
        </div>
        <div
          className='flex w-full h-[75vh] relative mb-[-32px] items-start justify-center'
          style={{ WebkitPerspective: '1000px', perspective: '1000px' }}
        >
          {data.map((el, id) => (
            <div
              key={id}
              className={`absolute flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-[20px] news-image text-inverse-on-surface py-7 px-[8%] md:px-[10%] gap-4 md:gap-8 ${
                el?.backdrop ? 'bg-on-surface-1' : undefined
              } ${id === 0 ? 'top-0' : 'top-full'}`}
            >
              <img
                src={el.src}
                alt='illustration'
                className='absolute top-0 w-full h-full object-cover'
                style={{ opacity: el?.backdrop ? 1 - el.backdrop : 1 }}
              />
              <h3 className='text-[7vw]/[0.9] sm:text-[4vw]/[0.9] news-text-animation translate-y-[100px] opacity-0 z-10 w-full'>
                {el.title}
              </h3>
              <p className='text-sm sm:text-base md:text-lg news-text-animation translate-y-[100px] opacity-0 z-10 w-full'>
                {el.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className='hidden md:block text-on-surface-2 text-base'>
        {data.length < 10 ? '0' + data.length : data.length}
      </p>
    </section>
  );
}
