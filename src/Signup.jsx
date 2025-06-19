import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './utils/AuthContext.jsx';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signup(name, email, password);
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232946] via-[#41D1FF] to-[#FFC300] p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-[#232946] mb-6 text-center"
        >
          Create Account
        </motion.h2>
        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-[#232946] font-semibold mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoFocus
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-[#232946] font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-[#232946] font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#41D1FF] text-[#232946] font-bold py-2 rounded-lg mt-4 shadow-lg hover:bg-[#232946] hover:text-[#41D1FF] transition"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </motion.button>
        </form>
        <div className="mt-6 text-[#232946] text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[#41D1FF] font-bold hover:underline">Login</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup; 