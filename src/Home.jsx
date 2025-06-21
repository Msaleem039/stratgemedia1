import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from './utils/VideoPlayer';
import videoData from './videoData';
import videoData1 from './utils/videoData1';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './utils/AuthContext.jsx';

const TABS = [
  { key: 'home', label: 'Caption' },
  { key: 'tech', label: 'Dubbing' },
  { key: 'ai', label: 'AI Archiving' },
  { key: 'contact', label: 'Contact' },
];

const Home = () => {
  const [modal, setModal] = useState({ open: false, video: null });
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, isAuthenticated, loading } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-[#232946] pb-16">
      {/* Navbar */}
      <nav className="w-full bg-[#232946] text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="text-xl md:text-2xl font-extrabold tracking-tight text-[#41D1FF]">StrategemMedia</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-2 md:gap-6 items-center">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1 rounded-md font-semibold transition-colors duration-200 ${activeTab === tab.key ? 'bg-[#41D1FF] text-[#232946]' : 'hover:bg-[#41D1FF]/20'}`}
              >
                {tab.label}
              </button>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-1 rounded-md font-bold bg-[#FFC300] text-[#232946] hover:bg-[#FFD600] transition shadow"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#41D1FF]/20 transition-colors"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#232946] border-t border-[#41D1FF]/20"
            >
              <div className="flex flex-col px-4 py-2 space-y-2">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-md font-semibold transition-colors duration-200 text-left ${activeTab === tab.key ? 'bg-[#41D1FF] text-[#232946]' : 'hover:bg-[#41D1FF]/20'}`}
                  >
                    {tab.label}
                  </button>
                ))}
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="mt-2 px-4 py-2 rounded-md font-bold bg-[#FFC300] text-[#232946] hover:bg-[#FFD600] transition shadow"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        {/* Home Tab: Video Grid */}
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
            >
              <header className="text-center mb-8">
                <h1 className="text-2xl md:text-4xl font-extrabold text-[#232946] mb-2">StrategemMedia Portfolio</h1>
                <p className="text-xl md:text-2xl text-[#41D1FF] font-medium">AI-Driven Digital Archiving & Multilingual Media Solutions</p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {videoData.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#F4F6FB] rounded-xl overflow-hidden shadow-lg flex flex-col border border-[#41D1FF]"
                  >
                    <div
                      className="relative group cursor-pointer aspect-video bg-black block"
                      onClick={() => setModal({ open: true, video })}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ width: '300px', height: '200px' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="bg-black/60 rounded-full p-4 border-2 border-[#41D1FF]">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#FFC300" viewBox="0 0 24 24" width="48" height="48">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <div className="font-bold text-lg text-[#232946] mb-2 line-clamp-2 min-h-[2rem]">{video.title}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Dubbing Tab */}
          {activeTab === 'tech' && (
            <motion.section
              key="tech"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <header className="text-center mb-8">
                <h1 className="text-2xl md:text-4xl font-extrabold text-[#232946] mb-2">Dubbing</h1>
                <p className="text-xl md:text-2xl text-[#41D1FF] font-medium">AI-Driven Dubbing Solutions</p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {videoData1.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#F4F6FB] rounded-xl overflow-hidden shadow-lg flex flex-col border border-[#41D1FF]"
                  >
                    <div
                      className="relative group cursor-pointer aspect-video bg-black block"
                      onClick={() => setModal({ open: true, video })}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ width: '300px', height: '200px' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="bg-black/60 rounded-full p-4 border-2 border-[#41D1FF]">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#FFC300" viewBox="0 0 24 24" width="48" height="48">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <div className="font-bold text-lg text-[#232946] mb-2 line-clamp-2 min-h-[2rem]">{video.title}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* AI Archiving Tab */}
          {activeTab === 'ai' && (
            <motion.section
              key="ai"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
             <img src="https://mediatool-videos.ams3.cdn.digitaloceanspaces.com/presentations/demo_complete_with_conclusion.mp4" alt="" />
              
              <div 
                className="max-w-md w-full mb-8 rounded-xl shadow-lg bg-gradient-to-br from-[#232946] to-[#41D1FF] flex items-center justify-center text-white font-bold text-xl"
                style={{ width: '400px', height: '300px', display: 'none' }}
              >
                AI Archiving
              </div>
              <h2 className="text-3xl font-bold mb-4 text-[#232946]">Preserve. Protect. Power Your Media Future.</h2>
              <p className="text-lg text-[#232946] mb-4 max-w-2xl text-center">AI-Driven Digital Archiving by StrategemMedia</p>
              <ul className="text-lg text-[#232946] space-y-2">
                <li>📦 Unmatched Industry Expertise</li>
                <li>🤖 Cutting-Edge AI & ML Technology</li>
                <li>🌍 Multilingual Capabilities</li>
                <li>📈 Measurable Business Metrics</li>
                <li>🗣️ Transcription, Translation, Digital Archiving, Subtitling & Dubbing</li>
              </ul>
            </motion.section>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <h2 className="text-3xl font-bold mb-4 text-[#232946]">Contact Us</h2>
              <p className="text-lg text-[#232946] mb-4 max-w-2xl text-center">Have questions or want to work with us? Reach out below!</p>
              <form className="w-full max-w-md bg-[#F4F6FB] p-6 rounded-xl shadow-lg space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded border border-[#41D1FF] focus:outline-none" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded border border-[#41D1FF] focus:outline-none" />
                <textarea placeholder="Your Message" className="w-full px-4 py-2 rounded border border-[#41D1FF] focus:outline-none" rows={4}></textarea>
                <button type="submit" className="w-full bg-[#41D1FF] text-[#232946] font-bold py-2 rounded hover:bg-[#232946] hover:text-[#41D1FF] transition">Send</button>
              </form>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {modal.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-[95%] max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-[#41D1FF] bg-[#232946]"
            >
              <button
                onClick={() => setModal({ open: false, video: null })}
                className="absolute top-2 right-2 z-10 bg-[#FFC300] text-[#232946] rounded-full p-1 md:p-2 shadow-lg hover:bg-[#FFD600] transition"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20" className="md:w-7 md:h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <VideoPlayer src={modal.video.src} title={modal.video.title} />
              <div className="p-2 md:p-4 text-center">
                <h2 className="text-lg md:text-2xl font-bold text-[#FFC300] mb-2">{modal.video.title}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;