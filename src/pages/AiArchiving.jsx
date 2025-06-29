import React from 'react';
import VideoPlayer from '../utils/VideoPlayer';

const AiArchiving = () => (
  <div className="min-h-screen bg-white text-[#232946] pb-16 flex flex-col items-center justify-center">
    <div className="w-full max-w-4xl mx-auto mb-8 px-4 pt-8">
      <VideoPlayer
        src="https://mediatool-videos.ams3.cdn.digitaloceanspaces.com/presentations/demo_complete_with_conclusion.mp4"
        title="AI Archiving - Demo"
      />
    </div>
    <h2 className="text-3xl font-bold mb-4 text-[#232946] mt-8 text-center">Preserve. Protect. Power Your Media Future.</h2>
    <p className="text-lg text-[#232946] mb-4 max-w-2xl text-center">AI-Driven Digital Archiving by StrategemMedia</p>
    <ul className="text-lg text-[#232946] space-y-2">
      <li>📦 Unmatched Industry Expertise</li>
      <li>🤖 Cutting-Edge AI & ML Technology</li>
      <li>🌍 Multilingual Capabilities</li>
      <li>📈 Measurable Business Metrics</li>
      <li>🗣️ Transcription, Translation, Digital Archiving, Subtitling & Dubbing</li>
    </ul>
  </div>
);

export default AiArchiving; 