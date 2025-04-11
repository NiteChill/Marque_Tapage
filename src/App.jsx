import './App.css';
import ReactLenis, { useLenis } from 'lenis/react';
import Landing from './components/Landing';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import News from './components/News';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from './components/Loading';
import Recommendations from './components/Recommendations';

export default function App() {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = useLenis(({ scroll }) => {}),
    scrollTo = (id, duration) => {
      lenis?.scrollTo(document.getElementById(id), { duration: duration });
    },
    [load, setLoad] = useState(true),
    handleLoad = () => {
      setLoad('done');
      setTimeout(() => setLoad(false), 1750);
    };
  useEffect(() => {
    window.addEventListener('load', handleLoad);
    if (document.readyState === 'complete') handleLoad();
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  if (load) return <Loading load={load} />;
  return (
    <ReactLenis root>
      <Landing />
      <div className='w-full md:h-1/8'></div>
      <News />
      <div className='w-full h-1/8'></div>
      <Recommendations />
      {/* <div className='w-full h-full'></div> */}
    </ReactLenis>
  );
}
