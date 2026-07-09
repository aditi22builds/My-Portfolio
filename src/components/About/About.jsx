import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        const q = gsap.utils.selector(el);
        
        gsap.fromTo(q('.about-text p, .section-title'), 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                stagger: 0.15, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                }
            }
        );
    }, []);

    return (
        <section id="about" ref={sectionRef}>
            <div className="glass-panel about-panel">
                <h2 className="section-title">About Me</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>
                            I'm currently pursuing a B.Tech in Data Science and building a strong foundation in computer science, programming, and engineering through continuous learning and hands-on projects.
                        </p>
                        <p>
                            Alongside my academic journey, I'm actively preparing for <strong>GATE 2028 (Computer Science & Engineering + Data Science)</strong> to strengthen my technical knowledge and problem-solving skills.
                        </p>
                        <p>
                            My long-term goal is to build impactful technology, contribute to innovative products, and grow into a skilled software engineer capable of solving real-world problems—whether at leading technology companies or by building products and ventures of my own.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
