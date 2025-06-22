import React from 'react';
import { 
  Globe, BrainCircuit, Network, Megaphone, Award, Cpu, Languages, 
  BarChart3, CheckSquare, Facebook, Twitter, Linkedin, Instagram, 
  Mail,
  Phone
} from 'lucide-react';

const Mainpage = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col text-white bg-[#12182B]">
      {/* First Banner Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        // style={{ backgroundImage: "url('/image/banner.jpeg')" }}
      >
        <div className="absolute inset-0 bg-[#12182B] bg-opacity-70"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            THE FUTURE IS TECHNOLOGY
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            Revolutionary Step to Change Digital and Traditional Media
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-12 text-lg">
            <div className="flex items-center gap-3">
              <Globe className="w-7 h-7 text-cyan-300" />
              <span>Urdu & Multilingual Expertise</span>
            </div>
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-7 h-7 text-cyan-300" />
              <span>AI at the Core</span>
            </div>
            <div className="flex items-center gap-3">
              <Network className="w-7 h-7 text-cyan-300" />
              <span>End-to-end Integration</span>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg max-w-4xl mx-auto">
            <div className="text-xl md:text-2xl font-medium text-yellow-300 flex items-center justify-center gap-4">
              <Megaphone className="w-10 h-10 flex-shrink-0" />
              <p className="text-left">
                Amplify your content. Speak every language. <br className="hidden sm:block" />
                Choose StrategemMedia – The AI-Powered Voice of Multilingual Media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Banner Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        // style={{ backgroundImage: "url('/image/banner1.jpeg')" }}
      >
        <div className="absolute inset-0 bg-[#12182B] bg-opacity-80"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            PRESERVE. PROTECT. POWER YOUR MEDIA FUTURE.
          </h2>
          <p className="text-xl md:text-2xl font-light mb-12" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            AI-Driven Digital Archiving by StrategemMedia
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg">
              <Award className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Unmatched Industry Expertise</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg">
              <Cpu className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Cutting-Edge AI & ML Technology</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg">
              <Languages className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Multilingual Capabilities</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg">
              <BarChart3 className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Measurable Business Metrics</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg sm:col-span-2 lg:col-span-3">
              <CheckSquare className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Transcription, Translation, Digital Archiving, Subtitling & Dubbing</span>
            </div>
          </div>
        </div>
      </section>

      {/* New Professional Footer */}
      <footer className="bg-gradient-to-b from-[#0A0F24] to-[#1A2A4A] border-t border-indigo-900/50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
                StrategemMedia
              </h3>
              <p className="text-blue-100 leading-relaxed max-w-md">
                The AI-Powered Voice of Multilingual Media, revolutionizing digital and traditional platforms with cutting-edge technology.
              </p>
              <div className="mt-6 flex items-center space-x-4">
                <a href="mailto:info@strategemmedia.com" className="flex items-center text-blue-100 hover:text-white transition">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>Email Us</span>
                </a>
                <a href="tel:+923325598676" className="flex items-center text-blue-100 hover:text-white transition">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+92 (332) 5598676</span>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Home', tab: 'main' },
                  { label: 'Caption', tab: 'home' },
                  { label: 'Dubbing', tab: 'tech' },
                  { label: 'AI Archiving', tab: 'ai' },
                  { label: 'Contact', tab: 'contact' }
                ].map((item) => (
                  <li key={item.tab}>
                    <button 
                      onClick={() => setActiveTab(item.tab)}
                      className="text-blue-100 hover:text-white transition flex items-center group"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition"></span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Legal */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-6">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: <Twitter className="w-5 h-5" />, name: 'Twitter' },
                  { icon: <Facebook className="w-5 h-5" />, name: 'Facebook' },
                  { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn' },
                  { icon: <Instagram className="w-5 h-5" />, name: 'Instagram' }
                ].map((social) => (
                  <a 
                    key={social.name}
                    href="#" 
                    className="text-blue-100 hover:text-white p-2 hover:bg-blue-900/30 rounded-full transition"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-blue-900/50">
                <h4 className="text-sm font-semibold text-blue-300 mb-3">Legal</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-blue-100">
                  <a href="#" className="hover:text-white transition">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition">Terms of Service</a>
                  <a href="#" className="hover:text-white transition">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-blue-900/50 text-center">
            <p className="text-sm text-blue-300">
              © {new Date().getFullYear()} StrategemMedia Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Mainpage;