import { useEffect, useState } from "react";
import axios from "axios";

const mockExperiences = [
  {
    company: "Karbaman",
    period: "1403 - اکنون",
    period_en: "2024 - Now",
    role: "Backend Developer",
    role_en: "Backend Developer", 
    description: "پروژه استارتاپ در حال توسعه با چالش‌های deployment واقعی",
    description_en: "Ongoing startup project with real deployment challenges",
    status: "active"
  },
  {
    company: "Prampto",
    period: "1403",
    period_en: "2024",
    role: "Student Developer",
    role_en: "Student Developer",
    description: "پروژه دانشجویی بر روی بهینه‌سازی prompt و همکاری تیمی",
    description_en: "Student project on AI prompt logic and team collaboration",
    status: "completed"
  },
  {
    company: "Telex Team",
    period: "1403",
    period_en: "2024", 
    role: "Remote Backend Developer",
    role_en: "Remote Backend Developer",
    description: "توسعه سیستم مدیریت کافه با داشبورد قابل گسترش",
    description_en: "Remote dev on scalable café dashboard system",
    status: "completed"
  },
  {
    company: "Foot o Fan",
    period: "1402",
    period_en: "2023",
    role: "Backend Intern", 
    role_en: "Backend Intern",
    description: "اولین تجربه شرکتی با Django/DRF که اعتماد به نفس را تقویت کرد",
    description_en: "First company experience with Django/DRF, boosted confidence",
    status: "completed"
  }
];

const WorkExperience = () => {
  const [experiences, setExperiences] = useState(mockExperiences);

  useEffect(() => {
    axios.get("http://localhost:8000/api/work-experience/")
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) setExperiences(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-terminal-bg to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-gradient mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-matrix-green to-electric-blue mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-matrix-green to-electric-blue"></div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className="relative flex items-start space-x-8 group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  exp.status === 'active' 
                    ? 'bg-matrix-green border-matrix-green animate-pulse' 
                    : 'bg-terminal-bg border-electric-blue'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    exp.status === 'active' ? 'bg-background' : 'bg-electric-blue'
                  }`}></div>
                </div>

                {/* Experience Card */}
                <div className="flex-1 bg-card border border-matrix-green/20 rounded-lg p-6 terminal-shadow hover:glow transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-mono font-bold text-matrix-green group-hover:text-electric-blue transition-colors">
                        {exp.company}
                      </h3>
                      <p className="text-electric-blue font-medium">{exp.role_en || exp.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono text-muted-foreground">{exp.period_en || exp.period}</span>
                      <div className={`text-xs font-mono px-2 py-1 rounded-full mt-1 ${
                        exp.status === 'active'
                          ? 'bg-matrix-green/20 text-matrix-green border border-matrix-green/30'
                          : 'bg-electric-blue/20 text-electric-blue border border-electric-blue/30'
                      }`}>
                        {exp.status === 'active' ? 'Active' : 'Completed'}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description_en || exp.description}
                  </p>

                  {/* Terminal Output Style */}
                  <div className="mt-4 font-mono text-xs">
                    <span className="text-matrix-green">$ git log --oneline</span>
                    <div className="text-foreground mt-1">
                      ✅ {exp.status === 'active' ? 'Currently contributing' : 'Successfully completed'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
