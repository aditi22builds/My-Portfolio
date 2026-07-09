import React, { useState } from 'react';
import surajPhoto from '../../assets/suraj.jpg';
import './Credits.css';

const Credits = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Floating Info Button */}
            <button
                className="credits-trigger"
                onClick={() => setOpen(true)}
                aria-label="Credits"
                title="Credits"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            </button>

            {/* Credits Modal Overlay */}
            <div className={`credits-overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
                <div className="credits-card" onClick={(e) => e.stopPropagation()}>
                    <button className="credits-close" onClick={() => setOpen(false)}>✕</button>

                    <p className="credits-label">Developed in collaboration with</p>

                    <img src={surajPhoto} alt="Suraj Sawant" className="credits-photo" />

                    <h3 className="credits-name">Suraj Sawant</h3>
                    <p className="credits-role">Full Stack Developer</p>

                    <div className="credits-socials">
                        {/* GitHub */}
                        <a href="https://github.com/daystar-1nine" target="_blank" rel="noopener noreferrer" className="credits-social-icon" title="GitHub">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/in/surajsawant19062005/" target="_blank" rel="noopener noreferrer" className="credits-social-icon" title="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/daystar.drafts/" target="_blank" rel="noopener noreferrer" className="credits-social-icon" title="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        {/* Gmail */}
                        <a href="mailto:surajonenine@gmail.com" className="credits-social-icon" title="Email">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                        {/* Facebook */}
                        <a href="https://www.facebook.com/profile.php?id=100042762615551" target="_blank" rel="noopener noreferrer" className="credits-social-icon" title="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                    </div>

                    <a href="https://suraj1nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="credits-portfolio-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        View Portfolio
                    </a>
                </div>
            </div>
        </>
    );
};

export default Credits;
