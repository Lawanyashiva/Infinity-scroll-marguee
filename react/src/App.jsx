import { useMemo, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';

const cards = [
    { title: 'Aurora App', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80' },
    { title: 'Pulse Studio', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80' },
    { title: 'Lumen Dashboard', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80' },
    { title: 'Nimbus Brand', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80' },
    { title: 'Helio Commerce', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
];

const App = () => {
    const [hovering, setHovering] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const x = useMotionValue(0);
    const speed = hovering ? 0.04 : 0.16;
    const totalWidth = cards.length * 340;

    useAnimationFrame((_, delta) => {
        x.set((current) => {
            const next = current - speed * delta;
            return next <= -totalWidth ? next + totalWidth : next;
        });
    });

    const duplicatedCards = useMemo(() => [...cards, ...cards], []);

    return (
        <div className="react-shell">
            <header className="react-header">
                <p className="eyebrow">Framer Motion Demo</p>
                <h1>Infinite projects marquee</h1>
                <p>Hover a card to reveal its title and slow the scroll for a polished premium experience.</p>
            </header>

            <div className="react-marquee" aria-label="Projects marquee">
                <motion.div className="react-track" style={{ x }}>
                    {duplicatedCards.map((card, index) => {
                        const isActive = focusedIndex === index % cards.length;
                        return (
                            <button
                                type="button"
                                key={`${card.title}-${index}`}
                                className="react-card"
                                onMouseEnter={() => setHovering(true)}
                                onMouseLeave={() => setHovering(false)}
                                onFocus={() => {
                                    setHovering(true);
                                    setFocusedIndex(index % cards.length);
                                }}
                                onBlur={() => {
                                    setHovering(false);
                                    setFocusedIndex(null);
                                }}
                            >
                                <img src={card.image} alt={card.title} />
                                <div className={`overlay ${isActive ? 'active' : ''}`}>
                                    <span>{card.title}</span>
                                </div>
                            </button>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default App;
