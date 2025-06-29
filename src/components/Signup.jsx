import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const { status, error, auth } = useSelector(state => state.auth);
  const toastShown = React.useRef(false);

  React.useEffect(() => {
    if (status === 'succeeded' && auth && !toastShown.current) {
      toastShown.current = true;
      toast.success('Registration successful! Please login.');
      
      // Add delay before navigation to ensure toast is visible
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 second delay
    }
    
    if (status === 'failed' && error && !toastShown.current) {
      toastShown.current = true;
      toast.error(error);
    }
  }, [auth, error, navigate, status]);

  const onSubmit = (data) => {
    toastShown.current = false; // Reset for new signup attempt
    dispatch(registerUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      password: data.password
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#15213D] p-4">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-[#232946] font-semibold mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('name', { required: true })}
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
              {...register('email', { required: true })}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-[#232946] font-semibold mb-1">Phone</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('phone', { required: true })}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-[#232946] font-semibold mb-1">Role</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('role', { required: true })}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-[#232946] font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
                {...register('password', { required: true })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-[#232946]" />
                ) : (
                  <Eye className="h-5 w-5 text-[#232946]" />
                )}
              </button>
            </div>
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#41D1FF] text-[#232946] font-bold py-2 rounded-lg mt-4 shadow-lg hover:bg-[#232946] hover:text-[#41D1FF] transition"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Signing up...' : 'Sign Up'}
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