import { useState, useEffect } from 'react';
import axios from 'axios';

const mockHero = {
  title: 'Erfan Parsafar',
  subtitle: 'Backend Developer',
  image: null,
};

const Hero = () => {
  const [hero, setHero] = useState(mockHero);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/hero/')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) setHero(res.data[0]);
      })
      .catch(() => {});
    const timer = setTimeout(() => {
      setTypingComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-terminal-bg">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-matrix-green/20" />
          ))}
        </div>
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-mono font-bold mb-4">
            <span className={`inline-block ${!typingComplete ? 'typing-animation' : ''} text-gradient`}>
              {hero.title}
            </span>
          </h1>
          {typingComplete && (
            <div className="animate-fade-in">
              <p className="text-xl md:text-2xl text-muted-foreground font-mono mb-2">
                {'>'} {hero.subtitle}
              </p>
              <p className="text-lg text-secondary font-mono">
                Django • Python • Logic-Driven Solutions
              </p>
            </div>
          )}
        </div>

        {/* Terminal-style intro */}
        {typingComplete && (
          <div className="animate-fade-in delay-500 bg-terminal-bg border border-matrix-green/30 rounded-lg p-6 terminal-shadow max-w-2xl mx-auto">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-sm text-muted-foreground font-mono">erfan@portfolio:~$</span>
            </div>
            <div className="text-left font-mono text-sm space-y-2">
              <p className="text-matrix-green">$ whoami</p>
              <p className="text-foreground">Backend Developer | Problem Solver | Code Architect</p>
              <p className="text-matrix-green">$ ls skills/</p>
              <p className="text-foreground">Python Django PostgreSQL Docker Redis Git</p>
              <p className="text-matrix-green pulse-glow">$ echo "Let's build something amazing together"</p>
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        {typingComplete && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="text-matrix-green">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <p className="text-xs mt-2 font-mono">scroll to explore</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
