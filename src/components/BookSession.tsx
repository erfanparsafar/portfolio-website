
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookSession = () => {
  const handleBookSession = () => {
    window.open('https://calendly.com/erfanparsafar', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-terminal-bg">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-gradient mb-4">
            Let's Talk!
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-matrix-green to-electric-blue mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Want to discuss a project, collaborate, or ask for advice? Book a time that works for you.
          </p>
        </div>

        <div className="bg-card border border-matrix-green/20 rounded-lg p-8 terminal-shadow hover:glow transition-all duration-300 max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-matrix-green to-electric-blue rounded-full flex items-center justify-center mx-auto mb-4 float-animation">
              <Calendar className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-xl font-mono font-bold text-foreground mb-2">
              Book a Free Tech Session
            </h3>
            <p className="text-sm text-muted-foreground">
              30-45 minutes • Available weekdays
            </p>
          </div>

          <Button
            onClick={handleBookSession}
            className="w-full bg-gradient-to-r from-matrix-green to-electric-blue hover:from-matrix-green/80 hover:to-electric-blue/80 text-background font-mono font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Book Now - It's Free!
          </Button>

          {/* Terminal style output */}
          <div className="mt-6 bg-terminal-bg border border-matrix-green/30 rounded p-3 text-left">
            <div className="font-mono text-xs">
              <span className="text-matrix-green">$ schedule --session</span>
              <div className="text-muted-foreground mt-1">
                ✅ Direct calendar access<br/>
                ✅ Instant confirmation<br/>
                ✅ Google Meet included
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSession;
