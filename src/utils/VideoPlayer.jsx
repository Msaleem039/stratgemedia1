import React from 'react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ src, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg bg-black border-4 border-blue-700"
    >
      <div className="relative pt-[56.25%] bg-black">
        <video
          src={src}
          title={title}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          className="absolute top-0 left-0 w-full h-full"
        />
        {/* Overlay to block right-click for download */}
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          onContextMenu={e => e.preventDefault()}
          style={{ pointerEvents: 'none' }}
        />
      </div>
      <div className="p-4 bg-blue-900 text-white text-center text-lg font-semibold">
        {title}
      </div>
    </motion.div>
  );
};

export default VideoPlayer; 