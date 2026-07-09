import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../Magnetic/Magnetic';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const el = footerRef.current;
        const q = gsap.utils.selector(el);
        
        gsap.fromTo(q('.footer-top, .footer-divider, .footer-bottom'), 
            { y: 30, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                stagger: 0.2, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 95%',
                }
            }
        );
    }, []);

    return (
        <footer className="footer-container" ref={footerRef}>
            <div className="footer-top">
                <h2 className="footer-title">Stay in Touch</h2>
                <h2 className="footer-title quote">Learn. Build. Innovate.</h2>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <div className="footer-socials">
                    <Magnetic>
                        <a href="https://www.linkedin.com/in/aditi-patil-888560414/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://www.instagram.com/_.aditiii07__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://github.com/aditi22builds" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                    </Magnetic>
                </div>

                <nav className="footer-links">
                    <a href="#hero" className="footer-link">Home</a>
                    <a href="#about" className="footer-link">About</a>
                    <a href="#skills" className="footer-link">Skills</a>
                    <a href="#projects" className="footer-link">Projects</a>
                </nav>

                <div className="footer-copyright">
                    © 2026 Aditi Patil
                </div>
            </div>

        </footer>
    );
};

export default Footer;
