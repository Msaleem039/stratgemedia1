// import React from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import VideoPlayer from './utils/VideoPlayer';
// import videoData from './videoData';
// import videoData1 from './utils/videoData1';

// const Dubbing = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const video = videoData1.find((v) => v.id === id);

//   if (!video) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Video not found</h2>
//           <Link to="/" className="text-blue-400 underline">Back to Home</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center py-12 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg bg-black border-4 border-blue-700 mb-8"
//       >
//         <VideoPlayer src={video.src} title={video.title} />
//       </motion.div>
//       <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-300 text-center">{video.title}</h1>
//       {/* Add more video details here if needed */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mt-6 px-6 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg text-white font-semibold transition"
//       >
//         ← Back
//       </button>
//     </div>
//   );
// };

// export default Dubbing; 