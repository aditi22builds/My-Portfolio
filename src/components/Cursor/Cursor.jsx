import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
    const cursorRingRef = useRef(null);
    const glassCardRef = useRef(null);
    const requestRef = useRef(null);

    useEffect(() => {
        const glassCard = glassCardRef.current;
        const cursorRing = cursorRingRef.current;

        if (!glassCard || !cursorRing) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let cardX = mouseX;
        let cardY = mouseY;

        let ringX = mouseX;
        let ringY = mouseY;

        let isFirstMove = true;
        let scale = 0;
        let targetScale = 0;
        let isHoveringBtn = false;
        let isHoveringHero = false;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Check if we are inside the hero section bounds
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                const rect = heroSection.getBoundingClientRect();
                isHoveringHero = (
                    mouseX >= rect.left && mouseX <= rect.right &&
                    mouseY >= rect.top && mouseY <= rect.bottom
                );
            }

            if (isFirstMove) {
                cardX = mouseX;
                cardY = mouseY;
                ringX = mouseX;
                ringY = mouseY;
                isFirstMove = false;
                glassCard.classList.add('active');
                cursorRing.classList.add('active');
            }

            // Only show cursor if inside hero AND not hovering a button
            if (isHoveringHero && !isHoveringBtn) {
                targetScale = 1;
            } else {
                targetScale = 0;
            }
        };

        const handleMouseLeave = () => {
            targetScale = 0;
        };

        // Attach listeners for specific elements to hide/modify cursor
        const attachHoverListeners = () => {
            const btns = document.querySelectorAll('.hero-btn, a, button');
            btns.forEach(btn => {
                btn.addEventListener('mouseenter', handleBtnEnter);
                btn.addEventListener('mouseleave', handleBtnLeave);
            });
        };

        const handleBtnEnter = () => {
            isHoveringBtn = true;
            targetScale = 0;
            cursorRing.classList.add('expanded');
        };

        const handleBtnLeave = () => {
            isHoveringBtn = false;
            if (isHoveringHero) {
                targetScale = 1;
            }
            cursorRing.classList.remove('expanded');
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Initial attachment
        setTimeout(attachHoverListeners, 1000); // Give time for render

        const updatePhysics = () => {
            cardX += (mouseX - cardX) * 0.08;
            cardY += (mouseY - cardY) * 0.08;

            ringX = mouseX;
            ringY = mouseY;

            scale += (targetScale - scale) * 0.15;

            const currentRingScale = cursorRing.classList.contains('expanded') ? 1.6 * scale : scale;

            glassCard.style.transform = `translate3d(${cardX}px, ${cardY}px, 0) translate(-50%, -50%) scale(${scale})`;
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentRingScale})`;

            requestRef.current = requestAnimationFrame(updatePhysics);
        };

        requestRef.current = requestAnimationFrame(updatePhysics);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(requestRef.current);
            const btns = document.querySelectorAll('.hero-btn, a, button');
            btns.forEach(btn => {
                btn.removeEventListener('mouseenter', handleBtnEnter);
                btn.removeEventListener('mouseleave', handleBtnLeave);
            });
        };
    }, []);

    return (
        <>
            <div id="cursor-ring" className="cursor-ring-outline" ref={cursorRingRef}></div>
            <div id="glass-card" className="glass-cursor-card" ref={glassCardRef}>
                <span className="cursor-card-text"><span className="text-white">Say</span> Hello!</span>
            </div>
        </>
    );
};

export default Cursor;
