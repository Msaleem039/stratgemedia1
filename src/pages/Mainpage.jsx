import React from 'react';
import { 
  Globe, BrainCircuit, Network, Megaphone, Award, Cpu, Languages, 
  BarChart3, CheckSquare, Facebook, Twitter, Linkedin, Instagram, 
  Mail,
  Phone
} from 'lucide-react';

const Mainpage = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col text-white" style={{ 
      backgroundImage: "url('/image/bg2.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    }}>
      {/* First Banner Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
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
        </div>
      </section>

      {/* Second Banner Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-yellow-400 mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            PRESERVE. PROTECT. POWER YOUR MEDIA FUTURE.
          </h2>
          <p className="text-xl md:text-2xl font-light mb-12" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            AI-Driven Digital Archiving by StrategemMedia
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
              <Award className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Unmatched Industry Expertise</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
              <Cpu className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Cutting-Edge AI & ML Technology</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
              <Languages className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Multilingual Capabilities</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
              <BarChart3 className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Measurable Business Metrics</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all sm:col-span-2 lg:col-span-3">
              <CheckSquare className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <span className="font-medium">Transcription, Translation, Digital Archiving, Subtitling & Dubbing</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mainpage;