import React from "react";

const AddUserModal = ({ open, onClose, onSubmit, form, setForm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-3 w-full max-w-xs shadow-xl mx-auto overflow-y-auto max-h-[90vh] flex flex-col justify-center">
        <h3 className="text-base sm:text-lg font-bold mb-3 text-[#232946]">Add New User</h3>
        <form className="space-y-2" onSubmit={onSubmit}>
          <div>
            <label className="block text-[#232946] font-semibold mb-1 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition text-sm text-black"
              required
            />
          </div>
          <div>
            <label className="block text-[#232946] font-semibold mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition text-sm text-black"
              required
            />
          </div>
          <div>
            <label className="block text-[#232946] font-semibold mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition text-sm text-black"
              required
            />
          </div>
          <div>
            <label className="block text-[#232946] font-semibold mb-1 text-sm">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition text-sm text-black"
              required
            />
          </div>
          <div>
            <label className="block text-[#232946] font-semibold mb-1 text-sm">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#41D1FF] focus:outline-none focus:ring-2 focus:ring-[#41D1FF] transition text-sm text-black"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-3 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal; 