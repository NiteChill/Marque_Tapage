import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from './SplitText';

export default function Loading({ load }) {
  useGSAP(() => {
    let tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      defaults: {
        duration: 0.6,
        ease: 'power1.inOut',
      },
    });
    if (load === true)
      tl.fromTo(
        '#loadingBall',
        {
          left: -64,
        },
        {
          left: '100%',
          duration: 1.25,
          stagger: 0.25,
        }
      );
    else if (load === 'done') {
      const charsTitle = gsap.utils.toArray('.loadingChar').reverse(),
        charsText = gsap.utils.toArray('.loadingCharSubtitle').reverse(),
        balls = gsap.utils.toArray('#loadingBall').reverse();
      gsap.to(charsTitle, {
        translateY: '100%',
        stagger: 0.03,
        duration: 0.75,
        delay: 0.3,
        ease: 'circ.in',
      });
      gsap.to(charsText, {
        translateY: '100%',
        stagger: 0.075,
        duration: 0.75,
        delay: 0.4,
        ease: 'circ.in',
      });
      gsap.to(balls, {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        stagger: 0.02,
        delay: 0.5,
        ease: 'power1.in',
      });
    }
  }, [load]);
  return (
    <main className='relative w-full h-full flex flex-col items-center justify-center overflow-hidden'>
      <div
        id='loadingBall'
        className='absolute w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 rounded-full bg-brand-3'
      ></div>
      <div
        id='loadingBall'
        className='absolute w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 rounded-full bg-brand-3'
      ></div>
      <div
        id='loadingBall'
        className='absolute w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 rounded-full bg-brand-3'
      ></div>
      <SplitText
        animationClass='loadingChar'
        className='text-[10vw]/[0.9] text-on-surface-2'
      >
        Bienvenue
      </SplitText>
      <SplitText
        split='words'
        animationClass='loadingCharSubtitle'
        className='text-[2vw] text-on-surface-2'
      >
        Chargement en cours
      </SplitText>
    </main>
  );
}
