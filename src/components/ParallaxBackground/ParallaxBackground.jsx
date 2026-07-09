import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ParallaxBackground.css';

gsap.registerPlugin(ScrollTrigger);

const ParallaxBackground = () => {
    const containerRef = useRef(null);
    const orb1 = useRef(null);
    const orb2 = useRef(null);
    const orb3 = useRef(null);
    const orb4 = useRef(null);
    const orb5 = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Each orb moves at a different speed for the parallax depth effect
            const orbConfigs = [
                { ref: orb1.current, y: -600, x: 80 },
                { ref: orb2.current, y: -350, x: -60 },
                { ref: orb3.current, y: -800, x: 100 },
                { ref: orb4.current, y: -450, x: -90 },
                { ref: orb5.current, y: -700, x: 50 },
            ];

            orbConfigs.forEach(({ ref, y, x }) => {
                gsap.to(ref, {
                    y,
                    x,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: document.body,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1.5,
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="parallax-bg" ref={containerRef}>
            <div className="parallax-orb parallax-orb--1" ref={orb1}></div>
            <div className="parallax-orb parallax-orb--2" ref={orb2}></div>
            <div className="parallax-orb parallax-orb--3" ref={orb3}></div>
            <div className="parallax-orb parallax-orb--4" ref={orb4}></div>
            <div className="parallax-orb parallax-orb--5" ref={orb5}></div>
        </div>
    );
};

export default ParallaxBackground;
