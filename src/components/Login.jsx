import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const { auth, status, error } = useSelector((state) => state.auth);
  const toastShown = React.useRef(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Handle success redirect with role check
  React.useEffect(() => {
    if (status === 'succeeded' && auth?.role && !toastShown.current) {
      toastShown.current = true;
      toast.success('Login successful!');
      
      // Debug log for role
      console.log("Auth object after login:", auth);
      // Add delay before navigation to ensure toast is visible
      setTimeout(() => {
        const role = auth.role?.toLowerCase();
        if (role === 'superadmin' || role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }, 1500); // 1.5 second delay
    }
  }, [auth, status, navigate]);

  // ❌ Show error toast
  React.useEffect(() => {
    if (status === 'failed' && error && !toastShown.current) {
      toastShown.current = true;
      toast.error(error);
    }
  }, [status, error]);

  const onSubmit = (data) => {
    toastShown.current = false; // Reset for new login attempt
    dispatch(login({ email: data.email, password: data.password }));
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
          Welcome Back
        </motion.h2>

        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-[#232946] font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('email', { required: true })}
              autoFocus
            />
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-[#232946] font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#232946] text-white font-bold py-2 rounded-lg mt-4 shadow-lg hover:bg-[#41D1FF] hover:text-white transition"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-6 text-[#232946] text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#41D1FF] font-bold hover:underline">Sign Up</Link>
          <div className="mt-2">
            <Link to="/forgot-password" className="text-[#41D1FF] font-semibold hover:underline">Forgot Password?</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
