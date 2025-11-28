import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LoadingScreen.css";

export default function LoadingScreen({ onComplete }) {
    const containerRef = useRef(null);
    const wordsContainerRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        const words = ["EXPLORE", "FIND", "POPULAR", "MUCABI"];

        // Create particles
        const particlesContainer = particlesRef.current;
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 3}s`;
            particlesContainer.appendChild(particle);
        }

        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            },
        });

        words.forEach((word, wordIndex) => {
            // Create word container
            const wordDiv = document.createElement("div");
            wordDiv.className = "word-container";

            // Split word into letters
            word.split("").forEach((letter, letterIndex) => {
                const letterSpan = document.createElement("span");
                letterSpan.className = "letter";
                letterSpan.textContent = letter;
                wordDiv.appendChild(letterSpan);
            });

            wordsContainerRef.current.appendChild(wordDiv);

            const letters = wordDiv.querySelectorAll(".letter");

            // Animate letters in with stagger
            tl.fromTo(
                letters,
                {
                    opacity: 0,
                    rotationX: -90,
                    y: 50,
                    scale: 0.5,
                },
                {
                    opacity: 1,
                    rotationX: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                }
            );

            // Hold
            tl.to({}, { duration: 0.3 });

            // Animate letters out with stagger
            tl.to(letters, {
                opacity: 0,
                rotationX: 90,
                y: -50,
                scale: 0.5,
                duration: 0.5,
                stagger: 0.03,
                ease: "back.in(1.7)",
                onComplete: () => {
                    wordDiv.remove();
                },
            });
        });

        // Final screen transition
        tl.to(containerRef.current, {
            opacity: 0,
            scale: 1.2,
            duration: 0.8,
            ease: "power2.inOut",
        });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div className="loading-screen" ref={containerRef}>
            <div className="particles" ref={particlesRef}></div>
            <div className="words-wrapper" ref={wordsContainerRef}></div>
        </div>
    );
}
