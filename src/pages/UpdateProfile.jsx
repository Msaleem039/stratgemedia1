import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const { auth, token } = useSelector(state => state.auth);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: auth?.name || '',
      email: auth?.email || '',
      phone: auth?.phone || '',
      role: auth?.role || '',
      password: ''
    }
  });
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch('https://api.strategemmedia.com/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || 'Profile updated!');
        reset({ ...data, password: '' });
      } else {
        toast.error(result.message || 'Failed to update profile.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232946] via-[#41D1FF] to-[#FFC300] p-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#232946]">Update Profile</h2>
        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-[#232946] font-semibold mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('name', { required: true })}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-[#232946] font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('email', { required: true })}
            />
          </div>
          <div>
            <label className="block text-[#232946] font-semibold mb-1">Phone</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('phone', { required: true })}
            />
          </div>
          <div>
            <label className="block text-[#232946] font-semibold mb-1">Role</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('role', { required: true })}
            />
          </div>
          <div>
            <label className="block text-[#232946] font-semibold mb-1">Password (leave blank to keep current)</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition"
              {...register('password')}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#41D1FF] text-[#232946] font-bold py-2 rounded-lg mt-4 shadow-lg hover:bg-[#232946] hover:text-[#41D1FF] transition"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile; 