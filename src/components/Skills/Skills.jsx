import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
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

        gsap.fromTo(q('.skill-category'), 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 75%',
                }
            }
        );
    }, []);

    const skillCategories = [
        {
            title: "Programming",
            skills: ["C", "C++", "Python", "Java"]
        },
        {
            title: "Data & AI",
            skills: ["Artificial Intelligence", "Data Analytics", "Machine Learning", "Data Science"]
        },
        {
            title: "Web Development",
            skills: ["React", "HTML", "CSS", "Modern Web Tech"]
        },
        {
            title: "Engineering",
            skills: ["Hardware-software integration", "Embedded systems"]
        }
    ];

    return (
        <section id="skills" ref={sectionRef}>
            <div className="glass-panel skills-panel">
                <h2 className="section-title">Currently Exploring</h2>
                
                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-category">
                            <h3 className="category-title">{category.title}</h3>
                            <div className="tags-container">
                                {category.skills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
