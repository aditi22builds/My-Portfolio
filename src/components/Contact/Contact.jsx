import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../Magnetic/Magnetic';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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

        gsap.fromTo(q('.contact-content'), 
            { y: 50, opacity: 0, scale: 0.98 },
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
        <section id="contact" ref={sectionRef}>
            <div className="glass-panel contact-panel">
                <h2 className="section-title">Let's Connect</h2>
                <div className="contact-content">
                    <p className="contact-text">
                        I'm always open to internships, hackathons, open-source contributions, online collaborations, and mentorship opportunities where I can learn, contribute, and grow.
                    </p>
                    <Magnetic>
                        <a href="mailto:aditiii.work@gmail.com" className="hero-btn contact-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <span className="btn-text">Say Hello</span>
                        </a>
                    </Magnetic>
                    <div className="contact-socials">
                        <Magnetic>
                            <a href="https://github.com/aditi22builds" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                <span>GitHub</span>
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://www.linkedin.com/in/aditi-patil-888560414/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                <span>LinkedIn</span>
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://www.instagram.com/_.aditiii07__/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                <span>Instagram</span>
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
