import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = React.useState(false);
  const query = useQuery();
  const navigate = useNavigate();
  const token = query.get('token');

  React.useEffect(() => {
    if (!token) {
      toast.error('Reset token is required.');
    }
  }, [token]);

  const onSubmit = async (data) => {
    if (!token) {
      toast.error('Reset token is required.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://api.strategemmedia.com/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: data.password })
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || 'Password reset successful!');
        reset();
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(result.message || 'Failed to reset password.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#232946]">Reset Password</h2>
        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-[#232946] font-semibold mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('password', { required: true })}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#41D1FF] text-[#232946] font-bold py-2 rounded-lg mt-4 shadow-lg hover:bg-[#232946] hover:text-[#41D1FF] transition"
            disabled={loading || !token}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 