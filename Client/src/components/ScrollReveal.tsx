import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number; // ms
    className?: string;
}

const ScrollReveal = ({ children, delay = 0, className = "" }: ScrollRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // reveal once, don't re-trigger on scroll back up
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;