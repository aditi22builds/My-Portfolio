import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Magnetic({ children }) {
    const magnetic = useRef(null);

    useEffect(() => {
        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            
            // Calculate center of the element
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            // Move it towards the mouse (by 35% of the distance)
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const handleMouseLeave = () => {
            // Snap back to original position
            xTo(0);
            yTo(0);
        };

        const el = magnetic.current;
        if(el) {
            el.addEventListener("mousemove", handleMouseMove);
            el.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if(el) {
                el.removeEventListener("mousemove", handleMouseMove);
                el.removeEventListener("mouseleave", handleMouseLeave);
            }
        }
    }, [])

    return React.cloneElement(children, { ref: magnetic });
}
