import { useGSAP } from '@gsap/react';
import { Cloud, Stairs, Waves } from './BrandShapes';
import { useRef } from 'react';
import gsap from 'gsap';
import SplitText from './SplitText';

export default function Landing() {
  const brandContainer = useRef();
  useGSAP(
    () => {
      gsap.from('.brandChars', {
        yPercent: 200,
        stagger: 0.03,
        duration: 0.75,
        ease: 'circ.out',
        delay: 0.4,
      });
    },
    { scope: brandContainer }
  );
  return (
    <main className='w-full h-full content-center overflow-hidden'>
      <div className='absolute flex items-center justify-center top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden'>
        <Stairs width='100%' height='100%' />
        <Waves width='100%' height='auto' />
        <Cloud width='100%' height='100%' />
      </div>
      <div
        ref={brandContainer}
        className='px-16 flex flex-col items-center justify-between text-[16vw] sm:text-[10vw] w-full text-on-surface-2 relative sm:flex-row'
      >
        <SplitText animationClass='brandChars'>Marque</SplitText>
        <SplitText animationClass='brandChars'>Tapage</SplitText>
      </div>
    </main>
  );
}
