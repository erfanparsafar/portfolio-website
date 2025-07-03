import { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-terminal-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-gradient mb-4">
            Contact Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-matrix-green to-electric-blue mx-auto rounded-full"></div>
          <p className="text-muted-foreground font-mono mt-4">Let's build something amazing together</p>
        </div>

        <div className="bg-terminal-bg border border-matrix-green/30 rounded-lg terminal-shadow">
          {/* Terminal Header */}
          <div className="flex items-center p-4 border-b border-matrix-green/20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-4 text-sm text-muted-foreground font-mono">erfan@contact:~$</span>
          </div>

          {/* Terminal Content */}
          <div className="p-6">
            {/* Terminal Output */}
            <div className="font-mono text-sm space-y-2 mb-6">
              <p className="text-matrix-green">$ ./contact_form.py --init</p>
              <p className="text-foreground">📡 Initializing secure connection...</p>
              <p className="text-electric-blue">🔐 Encryption: Active</p>
              <p className="text-matrix-green">✅ Ready to receive your message</p>
              <p className="text-muted-foreground">// Please fill out the form below</p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center text-matrix-green font-mono text-sm mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-matrix-green/30 rounded px-4 py-3 font-mono text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                  placeholder="Enter your full name..."
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-matrix-green font-mono text-sm mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-matrix-green/30 rounded px-4 py-3 font-mono text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-matrix-green font-mono text-sm mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-matrix-green/30 rounded px-4 py-3 font-mono text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                  placeholder="+98 XXX XXX XXXX"
                />
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center text-matrix-green font-mono text-sm mb-2">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-background border border-matrix-green/30 rounded px-4 py-3 font-mono text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              {/* Submit Button - Made smaller and repositioned */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="font-mono text-sm text-muted-foreground">
                  <span className="text-matrix-green">$</span> send_message --to erfanparsafar84@gmail.com
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="flex items-center space-x-2 bg-matrix-green text-background px-4 py-2 rounded font-mono text-sm font-medium hover:bg-electric-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-3 h-3 border-2 border-background border-t-transparent rounded-full"></div>
                      <span>Sending...</span>
                    </>
                  ) : submitted ? (
                    <>
                      <span className="text-green-400">✅</span>
                      <span>Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-matrix-green/20">
              <div className="font-mono text-sm space-y-2">
                <p className="text-matrix-green">$ cat contact_info.txt</p>
                <p className="text-foreground">📧 Email: erfanparsafar84@gmail.com</p>
                <p className="text-foreground">📱 Phone: +98 930 696 8299</p>
                <p className="text-foreground">🐙 GitHub: github.com/Erfanparsafar</p>
                <p className="text-foreground">💼 LinkedIn: linkedin.com/in/erfan-parsafar</p>
                <p className="text-foreground">📷 Instagram: @imerfanparsa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
