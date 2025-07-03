import { useEffect, useState } from "react";
import axios from "axios";

const mockTechnicalSkills = [
  { name: 'Python', level: 90, category: 'Language' },
  { name: 'Django', level: 85, category: 'Framework' },
  { name: 'PostgreSQL', level: 80, category: 'Database' },
  { name: 'Docker', level: 75, category: 'DevOps' },
  { name: 'DRF', level: 85, category: 'Framework' },
  { name: 'Git', level: 88, category: 'Tool' },
  { name: 'Redis', level: 70, category: 'Database' },
  { name: 'Linux', level: 75, category: 'OS' },
];
const mockSoftSkills = [
  { name: 'Problem-solving', icon: '🧩' },
  { name: 'Communication', icon: '💬' },
  { name: 'Teamwork', icon: '🤝' },
  { name: 'Adaptability', icon: '🔄' },
  { name: 'Time Management', icon: '⏰' },
  { name: 'Critical Thinking', icon: '🤔' },
];

const Skills = () => {
  const [technicalSkills, setTechnicalSkills] = useState(mockTechnicalSkills);
  const [softSkills, setSoftSkills] = useState(mockSoftSkills);

  useEffect(() => {
    axios.get("http://localhost:8000/api/skills/")
      .then(res => {
        console.log("Skills API response:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          const skills = res.data;
          setTechnicalSkills(skills.filter(s => s.category === 'technical'));
          setSoftSkills(skills.filter(s => s.category === 'soft'));
        }
      })
      .catch((error) => {
        console.error("Skills API error:", error);
      });
  }, []);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-gradient mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-matrix-green to-electric-blue mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div className="bg-card border border-matrix-green/20 rounded-lg p-6 terminal-shadow">
            <div className="flex items-center mb-6">
              <div className="text-matrix-green text-2xl mr-3">🔧</div>
              <h3 className="text-2xl font-mono font-bold text-matrix-green">Technical Skills</h3>
            </div>
            
            <div className="space-y-4">
              {technicalSkills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">{skill.category}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-matrix-green to-electric-blue h-2 rounded-full transition-all duration-1000 ease-out group-hover:glow"
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground font-mono mt-1">
                    {skill.level}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-card border border-electric-blue/20 rounded-lg p-6 terminal-shadow">
            <div className="flex items-center mb-6">
              <div className="text-electric-blue text-2xl mr-3">💡</div>
              <h3 className="text-2xl font-mono font-bold text-electric-blue">Soft Skills</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="flex items-center space-x-4 p-3 bg-terminal-bg rounded-lg border border-electric-blue/10 hover:border-electric-blue/30 transition-all duration-300 hover:glow-blue"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-2xl">{skill.icon}</div>
                  <div className="font-mono font-medium">{skill.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Command Simulation */}
        <div className="mt-12 bg-terminal-bg border border-matrix-green/30 rounded-lg p-6 terminal-shadow">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-4 text-sm text-muted-foreground font-mono">erfan@skills:~$</span>
          </div>
          <div className="font-mono text-sm space-y-2">
            <p className="text-matrix-green">$ python manage.py runserver --skills</p>
            <p className="text-foreground">🚀 Development server is running...</p>
            <p className="text-electric-blue">📡 Backend APIs: Active</p>
            <p className="text-matrix-green">📝  Database connections: Stable</p>
            <p className="text-yellow-400">⚡ Performance: Optimized</p>
            <p className="text-matrix-green pulse-glow">✅ Ready to tackle your next challenge!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
