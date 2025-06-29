import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from '../utils/VideoPlayer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../redux/product/productSlice';

const Dubbing = () => {
  const [modal, setModal] = useState({ open: false, video: null });
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const dubbingVideos = products.filter((video) => video.category === 'dubbing');

  return (
    <div className="min-h-screen bg-white text-[#232946] pb-16">
      <header className="text-center mb-8 pt-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#232946] mb-2">Dubbing</h1>
        <p className="text-xl md:text-2xl text-[#41D1FF] font-medium">AI-Driven Dubbing Solutions</p>
      </header>
      <div className="max-w-7xl mx-auto px-4">
        {status === 'loading' ? (
          <div className="text-center text-lg text-[#232946] py-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-lg text-red-500 py-10">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dubbingVideos.map((video) => (
              <motion.div
                key={video.id || video._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => setModal({ open: true, video })}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={video.thumbnail || video.image}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-cyan-400/80 rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32" height="32">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base text-gray-800 truncate" title={video.title}>{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {modal.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal({ open: false, video: null })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative w-full max-w-2xl bg-[#0A0F24] p-4 rounded-xl shadow-2xl border border-cyan-400/50"
              onClick={(e) => e.stopPropagation()}
            >
              <VideoPlayer src={modal.video.videoUrl || modal.video.src} title={modal.video.title} />
              <div className="pt-4 text-center">
                <h2 className="text-lg md:text-xl font-bold text-cyan-300">{modal.video.title}</h2>
              </div>
              <button
                onClick={() => setModal({ open: false, video: null })}
                className="absolute -top-3 -right-3 z-10 bg-cyan-400 text-black rounded-full p-2 shadow-lg hover:bg-cyan-300 transition"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dubbing; 