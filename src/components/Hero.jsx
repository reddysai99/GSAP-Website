import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';


gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 })
    useGSAP(() => {
        
        gsap.set('.right-leaf', { y: 0 });
        gsap.set('.left-leaf', { y: 0 });
        
        const heroSplit = new SplitText('.title', { type: 'chars,words' });
        
        
        const leftSubtitleSplit = new SplitText('.md\\:flex .view-cocktails .subtitle', { type: 'lines' });
        const rightSubtitleSplit = new SplitText('.text-right .subtitle', { type: 'lines' });
        
        
        const mobileSubtitleSplit = new SplitText('.md\\:hidden .subtitle', { type: 'lines' });
        
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));
        
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06
        });
        
        gsap.from(leftSubtitleSplit.lines, {
            opacity: 0,
            y: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
        });
        
        
        gsap.from(rightSubtitleSplit.lines, {
            opacity: 0,
            x: 50,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1.2,
        });
        
        
        gsap.from(mobileSubtitleSplit.lines, {
            opacity: 0,
            y: 30,
            duration: 1.5,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 1,
        });
        
        
        const leafTl = gsap.timeline({
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              id: 'leaf-animation'
            }
        });
        
        leafTl.to('.right-leaf', { y: 200, ease: 'none' }, 0);
        leafTl.to('.left-leaf', { y: -200, ease: 'none' }, 0);
        
  
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? 'top 120%' : 'bottom top';
        
        
        const videoTl = gsap.timeline({
          scrollTrigger: {
            trigger: 'video',
            start: startValue, 
            end: endValue,
            scrub: true,
            pin: true,
          }
        });
       videoRef.current.onloadedmetadata = () => {
        videoTl.to(videoRef.current, {
         currentTime: videoRef.current.duration 
        })
       }
        
       
    }, []);
  return (
    <>
    <section id="hero" className='noisy'>
        <h1 className='title'>MOJITO</h1>
        <img
        src="/images/hero-left-leaf.png"
        alt="hero-left-leaf"
        className='left-leaf'
         />
         <img
        src="/images/hero-right-leaf.png"
        alt="hero-right-leaf"
        className='right-leaf'
         />
         <div className='body'>
            <div className='content'>
              {/* Desktop layout */}
              <div className='flex justify-between items-start w-full hidden md:flex'>
                <div className='space-y-5 max-w-xs'>
                  <p> Cool. Crisp. Classic </p>
                  <div className='view-cocktails'>
                    <p className='subtitle'>
                      Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. 
                    </p>
                    <a href="#cocktails"> View Cocktails</a>
                  </div>
                </div>
                
                <div className='text-right ml-auto'>
                  <p className='subtitle font-modern-negra text-6xl text-yellow max-w-md'>
                    Sip the Spirit <br /> of Summer
                  </p>
                </div>
              </div>
              
              {/* Mobile layout */}
              <div className='flex flex-col items-center w-full md:hidden space-y-8 mt-20'>
                <p> Cool. Crisp. Classic </p>
                <p className='subtitle font-modern-negra text-4xl text-yellow text-center'>
                  Sip the Spirit <br /> of Summer
                </p>
                <div className='view-cocktails text-center'>
                  <p className='subtitle text-sm mb-4'>
                    Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. 
                  </p>
                  <a href="#cocktails"> View Cocktails</a>
                </div>
              </div>
            </div>
         </div>

    </section>
    <div className='video'>
      <video 
      ref={videoRef}
      src="/videos/output.mp4"
      muted
      playsInline
      preload='auto'
      />
    </div>
    </>
  );
};

export default Hero;