import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
    const overlayRef = useRef(null);
    const circleOuterRef = useRef(null);
    const circleInnerRef = useRef(null);
    const textRef = useRef(null);
    const nameRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Exit animation
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    onStart: () => {
                        overlayRef.current?.classList.add('exiting');
                    },
                    onComplete: () => {
                        onComplete?.();
                    }
                });
            }
        });

        // 1. Draw the outer dashed circle
        tl.fromTo(circleOuterRef.current,
            { strokeDashoffset: 283 },
            { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }
        );

        // 2. Draw the inner circle
        tl.fromTo(circleInnerRef.current,
            { strokeDashoffset: 239 },
            { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' },
            '-=0.6'
        );

        // 3. Fade in the "AP" text
        tl.fromTo(textRef.current,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
            '-=0.4'
        );

        // 4. Fade in the name below
        tl.to(nameRef.current,
            { color: 'rgba(255, 255, 255, 0.7)', duration: 0.5, ease: 'power2.out' },
            '-=0.3'
        );

        // 5. Animate the progress bar
        tl.to(progressRef.current,
            { width: '100%', duration: 0.6, ease: 'power2.inOut' },
            '-=0.3'
        );

        // 6. Small pause before exit
        tl.to({}, { duration: 0.3 });

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div className="loader-overlay" ref={overlayRef}>
            <div className="loader-logo-wrapper">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ filter: 'drop-shadow(0 0 15px rgba(57, 255, 20, 0.3))' }}>
                    <circle
                        ref={circleOuterRef}
                        cx="50" cy="50" r="45"
                        stroke="url(#loaderGrad1)"
                        strokeWidth="3"
                        strokeDasharray="283"
                        strokeDashoffset="283"
                        fill="none"
                    />
                    <circle
                        ref={circleInnerRef}
                        cx="50" cy="50" r="38"
                        stroke="url(#loaderGrad2)"
                        strokeWidth="1"
                        strokeDasharray="239"
                        strokeDashoffset="239"
                        fill="none"
                        opacity="0.5"
                    />
                    <text
                        ref={textRef}
                        x="50" y="54"
                        fontFamily="inherit"
                        fontWeight="600"
                        fontSize="36"
                        fill="#ffffff"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        letterSpacing="2"
                        opacity="0"
                    >AP</text>
                    <defs>
                        <linearGradient id="loaderGrad1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#39FF14" />
                            <stop offset="1" stopColor="#8A2BE2" />
                        </linearGradient>
                        <linearGradient id="loaderGrad2" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#8A2BE2" />
                            <stop offset="1" stopColor="#39FF14" />
                        </linearGradient>
                    </defs>
                </svg>
                <span className="loader-name" ref={nameRef}>Aditi Patil</span>
                <div className="loader-progress-track">
                    <div className="loader-progress-bar" ref={progressRef}></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
