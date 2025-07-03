
import { useState, useEffect } from 'react';

const ScrollMouse = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (position / maxScroll) * 100;
      setScrollPosition(Math.min(scrollPercentage, 90)); // Cap at 90% to avoid overlapping footer
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed right-4 z-40 transition-all duration-300 ease-out"
      style={{
        top: `${10 + (scrollPosition * 0.7)}%`, // Moves from 10% to 80% of viewport height
      }}
    >
      <div className="relative group">
        {/* Mouse body */}
        <div className="w-6 h-10 border-2 border-matrix-green rounded-full bg-terminal-bg/80 backdrop-blur-sm flex items-start justify-center pt-2 glow transition-all duration-300 group-hover:border-electric-blue group-hover:glow-blue">
          {/* Mouse wheel */}
          <div className="w-1 h-2 bg-matrix-green rounded-full animate-pulse group-hover:bg-electric-blue"></div>
        </div>
        
        {/* Mouse cable */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <svg
            width="2"
            height="60"
            viewBox="0 0 2 60"
            className="text-matrix-green group-hover:text-electric-blue transition-colors duration-300"
          >
            <path
              d="M1 0 Q1 15, 1.5 30 Q0.5 45, 1 60"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className="opacity-60"
            />
          </svg>
        </div>

        {/* Scroll indicator tooltip */}
        <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-terminal-bg border border-matrix-green/30 rounded px-2 py-1">
            <span className="text-xs font-mono text-matrix-green">
              {Math.round(scrollPosition)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollMouse;
