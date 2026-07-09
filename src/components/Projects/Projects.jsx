import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        const q = gsap.utils.selector(el);
        
        gsap.fromTo(q('.section-title'), 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                }
            }
        );

        gsap.fromTo(q('.project-card'), 
            { y: 50, opacity: 0, scale: 0.95 },
            { 
                y: 0, 
                opacity: 1, 
                scale: 1,
                duration: 0.8, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 75%',
                }
            }
        );
    }, []);

    return (
        <section id="projects" ref={sectionRef}>
            <div className="glass-panel projects-panel">
                <h2 className="section-title">Selected Projects</h2>
                
                <div className="projects-grid">
                    {/* Placeholder for future projects */}
                    <div className="project-card placeholder">
                        <div className="project-content">
                            <h3>Project Coming Soon</h3>
                            <p>Currently working on exciting projects in Data Science and Embedded Systems. Check back later!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
