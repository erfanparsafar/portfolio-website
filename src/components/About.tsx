import { useEffect, useState } from "react";
import axios from "axios";

const mockAbout = {
  title: "Erfan Parsafar",
  description: `Hi! I'm Erfan Parsafar, a backend developer with a passion for logic, clean architecture, and solving real-world problems through code.\nI love writing structured Django code, working with REST APIs, and collaborating in teams. I believe even small choices can lead to great outcomes — and that applies to both code and life.`,
  image: null,
};

const About = () => {
  const [about, setAbout] = useState(mockAbout);
  const [skills, setSkills] = useState([]);
  const [writings, setWritings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/about/")
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAbout(res.data[0]);
        }
      })
      .catch(() => {
        // fallback: mock data
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/skills/")
      .then(res => {
        setSkills(res.data.map(item => ({
          name: item.name,
          level: item.level,
          category: item.category || "Unknown"
        })));
      })
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/writings/")
      .then(res => {
        setWritings(res.data.map(item => ({
          title: item.title,
          summary: item.summary || item.content?.slice(0, 100) || "",
          content: item.content
        })));
      })
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-terminal-bg to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-gradient mb-4">
            {'<'} About Me {' />'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-matrix-green to-electric-blue mx-auto rounded-full"></div>
        </div>

        <div className="bg-card border border-matrix-green/20 rounded-lg p-8 terminal-shadow glow">
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex flex-col space-y-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="text-muted-foreground font-mono text-sm mb-4">
                // about_me.py
              </div>
              <div className="font-mono text-sm space-y-4">
                <div className="text-electric-blue">
                  <span className="text-purple-400">def</span>{' '}
                  <span className="text-yellow-400">introduce_myself</span>():
                </div>
                <div className="ml-4 space-y-2 text-foreground leading-relaxed">
                  <p className="text-base md:text-lg">
                    {about.description.split("\n")[0]}
                  </p>
                  <p className="text-base md:text-lg">
                    {about.description.split("\n")[1]}
                  </p>
                </div>
                <div className="text-purple-400 ml-4">
                  <span className="text-orange-400">return</span>{' '}
                  <span className="text-green-300">"Ready to build amazing solutions together!"</span>
                </div>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-matrix-green/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-matrix-green">2+</div>
              <div className="text-sm text-muted-foreground font-mono">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-electric-blue">4+</div>
              <div className="text-sm text-muted-foreground font-mono">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-matrix-green">Django</div>
              <div className="text-sm text-muted-foreground font-mono">Primary Framework</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-electric-blue">∞</div>
              <div className="text-sm text-muted-foreground font-mono">Lines of Code</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
