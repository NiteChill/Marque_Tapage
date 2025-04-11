import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ImageAnimated({ src, alt, width, height }) {
  useGSAP(() => {
    gsap.from('#imageContainer', {
      scrollTrigger: {
        trigger: '#imageContainer',
        start: '60 bottom',
        toggleActions: 'play none none reverse',
        // markers: true,
      },
      scale: 0.9,
      duration: 0.8,
      ease: 'power1.inOut',
    });
    gsap.from('#image', {
      scrollTrigger: {
        trigger: '#imageContainer',
        start: '60 bottom',
        toggleActions: 'play none none reverse',
        // markers: true,
      },
      scale: 1.1,
      duration: 0.8,
      ease: 'power1.inOut',
    });
  });
  return (
    <div
      className='rounded-3xl overflow-hidden'
      style={{ width: width, height: height }}
      id='imageContainer'
    >
      <img src={src} alt={alt} id='image' className='object-fill w-full h-full' />
    </div>
  );
}
