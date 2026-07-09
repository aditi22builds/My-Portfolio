import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import Magnetic from '../Magnetic/Magnetic';
import Lanyard from '../Lanyard/Lanyard';

import profileImg from '../../assets/profile.png';

const getCardSVG = (theme, profileBase64) => {
  const isLight = theme === 'light';
  const bgColor = isLight ? '#ffffff' : '#120f1a';
  const photoBg = isLight ? '#f0f0f0' : '#201a2e';
  const textColor = isLight ? '#111111' : '#ffffff';
  const tagBg = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)';
  const subText = isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)';
  const accentColor = isLight ? '#009900' : '#39FF14';

  const photoSVG = profileBase64 
    ? `
      <defs>
        <clipPath id="profileClip">
          <circle cx="335" cy="380" r="180" />
        </clipPath>
      </defs>
      <circle cx="335" cy="380" r="186" fill="${bgColor}"/>
      <image width="360" height="360" x="155" y="200" href="${profileBase64}" clip-path="url(#profileClip)" />
      `
    : `
      <circle cx="335" cy="380" r="180" fill="${photoBg}" stroke="${bgColor}" stroke-width="12"/>
      <text x="335" y="380" font-family="sans-serif" font-size="40" fill="#8A2BE2" text-anchor="middle" dominant-baseline="middle">PHOTO</text>
      `;

  return `
  <svg width="670" height="1000" viewBox="0 0 670 1000" xmlns="http://www.w3.org/2000/svg">
    <rect width="670" height="1000" fill="${bgColor}"/>
    <!-- Top pattern/gradient -->
    <rect width="670" height="380" fill="url(#grad)" />
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8A2BE2;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#39FF14;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <!-- Profile picture placeholder or image -->
    ${photoSVG}

    <!-- Name and Tag -->
    <text x="335" y="640" font-family="sans-serif" font-size="72" font-weight="bold" fill="${textColor}" text-anchor="middle">Aditi Patil</text>
    
    <rect x="135" y="690" width="400" height="60" rx="30" fill="${tagBg}"/>
    <text x="335" y="730" font-family="sans-serif" font-size="32" font-weight="500" fill="${accentColor}" text-anchor="middle">B.Tech Data Science</text>
    
    <text x="335" y="830" font-family="sans-serif" font-size="30" fill="${subText}" text-anchor="middle">GATE 2028 Aspirant</text>
    <text x="335" y="880" font-family="sans-serif" font-size="30" fill="${subText}" text-anchor="middle">C++ | Python | AI</text>
    
    <!-- Bottom branding -->
    <text x="335" y="960" font-family="sans-serif" font-size="24" fill="#8A2BE2" text-anchor="middle" font-weight="bold" letter-spacing="2">LEARN . BUILD . INNOVATE</text>
  </svg>
  `;
};

const strapSVG = `
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#0d0d12"/>
  <circle cx="100" cy="100" r="60" fill="none" stroke="#39FF14" stroke-width="6" stroke-dasharray="10,5"/>
  <text x="100" y="105" font-family="sans-serif" font-size="50" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">AP</text>
</svg>
`;

const strapImageURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(strapSVG)}`;

const Hero = ({ theme = 'dark' }) => {
    const titleRef = useRef(null);
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const hasAnimated = useRef(false);
    const [profileBase64, setProfileBase64] = useState('');

    const frontImageURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(getCardSVG(theme, profileBase64))}`;

    useEffect(() => {
        // Fetch and encode profile image for the SVG data URI, cropping it perfectly to a square
        fetch(profileImg)
            .then(res => res.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const img = new Image();
                    img.onload = () => {
                        // Create a square canvas to crop the image
                        const size = 360;
                        const canvas = document.createElement('canvas');
                        canvas.width = size;
                        canvas.height = size;
                        const ctx = canvas.getContext('2d');
                        
                        // Calculate object-fit: cover dimensions
                        const scale = Math.max(size / img.width, size / img.height);
                        const w = img.width * scale;
                        const h = img.height * scale;
                        const x = (size - w) / 2;
                        const y = (size - h) / 2;
                        
                        ctx.drawImage(img, x, y, w, h);
                        
                        // Set the properly cropped base64 image
                        setProfileBase64(canvas.toDataURL('image/png'));
                    };
                    img.src = reader.result;
                };
                reader.readAsDataURL(blob);
            })
            .catch(err => console.error("Error loading profile image:", err));

        // Text reveal animation logic
        if (titleRef.current && !hasAnimated.current) {
            hasAnimated.current = true;
            const text = titleRef.current.innerHTML;
            const parts = text.split(/(\s+|<br\s*\/?>)/i);
            titleRef.current.innerHTML = '';

            let wordIndex = 0;
            parts.forEach(part => {
                if (part.trim() === '') {
                    titleRef.current.appendChild(document.createTextNode(' '));
                } else if (part.toLowerCase().startsWith('<br')) {
                    titleRef.current.appendChild(document.createElement('br'));
                } else {
                    const wrapper = document.createElement('span');
                    wrapper.className = 'word-wrapper';

                    const inner = document.createElement('span');
                    inner.className = 'word-inner';
                    inner.textContent = part;

                    inner.style.animationDelay = `${wordIndex * 0.1}s`;
                    wordIndex++;

                    wrapper.appendChild(inner);
                    titleRef.current.appendChild(wrapper);
                }
            });
        }

        // 3D Parallax Tilt Logic (for the left text block)
        const handleMouseMove = (e) => {
            if (!heroRef.current || !contentRef.current) return;
            
            const rect = heroRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

            const maxTiltX = 10;
            const maxTiltY = 10;

            contentRef.current.style.transform = `perspective(1000px) rotateX(${-y * maxTiltX}deg) rotateY(${x * maxTiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        };

        const handleMouseLeave = () => {
            if (!contentRef.current) return;
            contentRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        };

        const heroElement = heroRef.current;
        if (heroElement) {
            heroElement.addEventListener('mousemove', handleMouseMove);
            heroElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (heroElement) {
                heroElement.removeEventListener('mousemove', handleMouseMove);
                heroElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <section className="hero-section" id="hero" ref={heroRef}>
            <div className="hero-split-layout">
                {/* Left Side: Text */}
                <main className="hero-content" ref={contentRef}>
                    <h1 className="hero-title" ref={titleRef}>
                        Hi, I'm Aditi Patil <br/> Data Science Student
                    </h1>
                    <div className="hero-btn-container">
                        <Magnetic>
                            <a href="#contact" className="hero-btn">
                                <span className="btn-text">Get in Touch</span>
                                <span className="blinking-dot"></span>
                            </a>
                        </Magnetic>
                    </div>
                </main>

                {/* Right Side: Interactive Lanyard */}
                <aside className="hero-lanyard-container">
                    {/* position shifts the camera to the left (-1.5), making the card appear on the right side of the screen */}
                    <Lanyard position={[-1.5, 0, 17]} fov={14} gravity={[0, -40, 0]} frontImage={frontImageURL} lanyardImage={strapImageURL} />
                </aside>
            </div>
        </section>
    );
};

export default Hero;
