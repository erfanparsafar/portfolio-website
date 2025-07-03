import { useEffect, useState } from "react";
import axios from "axios";

const mockProjects = [
  {
    title: "Karbaman",
    subtitle: "Nationwide Car Wash Platform",
    description: "A Django-based unified reservation system still in development",
    status: "in_development",
    tech: "Django,PostgreSQL,DRF,Redis",
    year: "2024-Now"
  },
  {
    title: "Telex Café Manager",
    subtitle: "Backend system for café management across Iran",
    description: "Complete café management system with dashboard and user features",
    status: "completed",
    tech: "Django,REST API,PostgreSQL,Docker",
    year: "2024"
  },
  {
    title: "Prampto",
    subtitle: "University project focused on prompt optimization",
    description: "AI prompt optimization system with team collaboration features",
    status: "completed",
    tech: "Django,AI Integration,Team Collaboration",
    year: "2024"
  },
  {
    title: "Foot o Fan Internship",
    subtitle: "First company experience with Django/DRF",
    description: "Real-world Django backend development that boosted confidence",
    status: "completed",
    tech: "Django,DRF,PostgreSQL,Git",
    year: "2023"
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {
    axios.get("http://localhost:8000/api/projects/")
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch(() => {
        // fallback: mock data
      });
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-terminal-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-gradient mb-4">
            Projects Portfolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-matrix-green to-electric-blue mx-auto rounded-full"></div>
          <p className="text-muted-foreground font-mono mt-4">Building real solutions with clean code</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-card border border-matrix-green/20 rounded-lg p-6 terminal-shadow hover:glow transition-all duration-300 group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Project Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-mono font-bold text-matrix-green mb-1 group-hover:text-electric-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-electric-blue font-medium mb-2">
                    {project.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
                  <div className={`text-xs font-mono px-2 py-1 rounded-full mt-1 ${
                    project.status === 'in_development' 
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                      : 'bg-matrix-green/20 text-matrix-green border border-matrix-green/30'
                  }`}>
                    {project.status === 'in_development' ? 'In Development' : 'Completed'}
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech && project.tech.split(',').map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-terminal-bg border border-electric-blue/30 rounded-full text-xs font-mono text-electric-blue"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              {/* Project Footer */}
              <div className="border-t border-muted pt-4 mt-4">
                <div className="font-mono text-xs text-muted-foreground">
                  <span className="text-matrix-green">$</span> git log --oneline
                </div>
                <div className="font-mono text-xs text-foreground mt-1">
                  ✅ {project.status === 'in_development' ? 'Active development' : 'Successfully deployed'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Output */}
        <div className="mt-12 bg-terminal-bg border border-matrix-green/30 rounded-lg p-6 terminal-shadow">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-4 text-sm text-muted-foreground font-mono">erfan@projects:~$</span>
          </div>
          <div className="font-mono text-sm space-y-1">
            <p className="text-matrix-green">$ find . -name "*.py" | wc -l</p>
            <p className="text-foreground">1000+ files written with passion</p>
            <p className="text-electric-blue">$ git shortlog -sn</p>
            <p className="text-foreground">Countless commits, continuous learning</p>
            <p className="text-matrix-green pulse-glow">$ echo "Each project teaches something new"</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
