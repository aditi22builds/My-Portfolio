import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import PillNav from './components/PillNav/PillNav';
import Hero from './components/Hero/Hero';
import Cursor from './components/Cursor/Cursor';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import ParallaxBackground from './components/ParallaxBackground/ParallaxBackground';
import './App.css';

const LogoSVG = (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px rgba(57, 255, 20, 0.4))' }}>
      <circle cx="50" cy="50" r="45" stroke="url(#paint0_linear)" strokeWidth="3" strokeDasharray="12 8" />
      <circle cx="50" cy="50" r="38" stroke="url(#paint1_linear)" strokeWidth="1" opacity="0.5" />
      <text x="50" y="54" fontFamily="inherit" fontWeight="600" fontSize="36" fill="#ffffff" textAnchor="middle" dominantBaseline="middle" letterSpacing="2">AP</text>
      <defs>
          <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#39FF14" />
              <stop offset="1" stopColor="#8A2BE2" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8A2BE2" />
              <stop offset="1" stopColor="#39FF14" />
          </linearGradient>
      </defs>
  </svg>
);

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

function App() {
  const videoRef = useRef(null);
  const lenisRef = useRef(null);
  const [activeHref, setActiveHref] = useState('#hero');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Lock/unlock scroll based on loading state
  useEffect(() => {
      if (loading) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = '';
          // Give Lenis a nudge to recalculate after unlock
          lenisRef.current?.resize();
      }
  }, [loading]);

  useEffect(() => {
    // Initialize Lenis for premium smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Intersection Observer to update active activeHref for PillNav
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHref(`#${entry.target.id}`);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => {
      observer.observe(section);
    });

    // Background Video Reverse Logic
    const video = videoRef.current;
    if (!video) return;

    let reqId;

    const reversePlay = () => {
      if (video.currentTime <= 0.05) {
        cancelAnimationFrame(reqId);
        video.play();
      } else {
        video.currentTime -= 0.03;
        reqId = requestAnimationFrame(reversePlay);
      }
    };

    const startReverse = () => {
      reqId = requestAnimationFrame(reversePlay);
    };

    video.addEventListener('ended', startReverse);

    return () => {
      video.removeEventListener('ended', startReverse);
      if (reqId) cancelAnimationFrame(reqId);
      lenis.destroy();
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <PillNav
        logo={LogoSVG}
        logoAlt="Aditi Patil Logo"
        items={navItems}
        activeHref={activeHref}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="var(--glass-bg)"
        pillColor="var(--glass-border)"
        hoveredPillTextColor="var(--accent-color)"
        pillTextColor="var(--text-primary)"
        theme={theme}
        toggleTheme={toggleTheme}
        initialLoadAnimation={true}
      />

      <div className="top-shadow"></div>

      {/* Fixed Background Elements */}
      <div className="video-container">
          <video autoPlay muted playsInline id="bg-video" ref={videoRef}>
              <source src="https://api.getlayers.ai/storage/v1/object/public/public/assets/loopstack-f8c64439bf/flower.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
      </div>

      {/* Deep Parallax Background Orbs */}
      <ParallaxBackground />

      <Cursor />

      {/* Scrollable Content Container */}
      <div className="scroll-container">
        <Hero theme={theme} />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
