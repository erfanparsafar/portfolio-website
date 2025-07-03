
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import WorkExperience from '@/components/WorkExperience';
import Writings from '@/components/Writings';
import BookSession from '@/components/BookSession';
import Contact from '@/components/Contact';
import ScrollMouse from '@/components/ScrollMouse';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Custom Scroll Mouse */}
      <ScrollMouse />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />
      
      {/* Skills Section */}
      <Skills />
      
      {/* Projects Section */}
      <Projects />
      
      {/* Work Experience Timeline */}
      <WorkExperience />
      
      {/* Writings & Insights */}
      <Writings />
      
      {/* Book a Session */}
      <BookSession />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 text-center border-t border-matrix-green/20">
        <p className="font-mono text-sm text-muted-foreground">
          © 1403 Erfan Parsafar • Built with passion and clean code
        </p>
      </footer>
    </div>
  );
};

export default Index;
