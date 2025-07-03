
const DinosaurIcon = () => {
  return (
    <div className="relative">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        className="float-animation"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dinosaur body - pixel style */}
        <rect x="8" y="20" width="4" height="4" fill="#00ff41" />
        <rect x="12" y="16" width="4" height="4" fill="#00ff41" />
        <rect x="16" y="12" width="4" height="4" fill="#00ff41" />
        <rect x="20" y="12" width="4" height="4" fill="#00ff41" />
        <rect x="24" y="12" width="4" height="4" fill="#00ff41" />
        <rect x="28" y="16" width="4" height="4" fill="#00ff41" />
        <rect x="32" y="20" width="4" height="4" fill="#00ff41" />
        <rect x="36" y="24" width="4" height="4" fill="#00ff41" />
        <rect x="40" y="28" width="4" height="4" fill="#00ff41" />
        <rect x="44" y="32" width="4" height="4" fill="#00ff41" />
        
        {/* Body */}
        <rect x="12" y="20" width="4" height="4" fill="#00ff41" />
        <rect x="16" y="16" width="4" height="4" fill="#00ff41" />
        <rect x="20" y="16" width="4" height="4" fill="#00ff41" />
        <rect x="24" y="16" width="4" height="4" fill="#00ff41" />
        <rect x="28" y="20" width="4" height="4" fill="#00ff41" />
        <rect x="32" y="24" width="4" height="4" fill="#00ff41" />
        <rect x="36" y="28" width="4" height="4" fill="#00ff41" />
        <rect x="40" y="32" width="4" height="4" fill="#00ff41" />
        
        {/* Legs */}
        <rect x="16" y="24" width="4" height="4" fill="#00ff41" />
        <rect x="16" y="28" width="4" height="4" fill="#00ff41" />
        <rect x="32" y="32" width="4" height="4" fill="#00ff41" />
        <rect x="32" y="36" width="4" height="4" fill="#00ff41" />
        
        {/* Eye */}
        <rect x="20" y="12" width="2" height="2" fill="#ffffff" />
        
        {/* Spikes */}
        <rect x="24" y="8" width="4" height="4" fill="#00d4ff" />
        <rect x="28" y="12" width="4" height="4" fill="#00d4ff" />
        <rect x="32" y="16" width="4" height="4" fill="#00d4ff" />
      </svg>
      
      {/* Typing effect under dinosaur */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <span className="text-xs font-mono text-matrix-green pulse-glow">
          *typing sounds*
        </span>
      </div>
    </div>
  );
};

export { DinosaurIcon };
