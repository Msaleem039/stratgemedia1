import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserModal from "./AddUserModal";
import { useSelector } from "react-redux";

const ListUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({ status: "" });
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://api.strategemmedia.com/api/users/all");
      console.log("API Response:", res.data);
      
      // Handle different possible response structures
      let fetchedUsers = [];
      if (res.data.data && res.data.data.users) {
        fetchedUsers = res.data.data.users;
      } else if (res.data.users) {
        fetchedUsers = res.data.users;
      } else if (Array.isArray(res.data)) {
        fetchedUsers = res.data;
      } else {
        console.error("Unexpected API response structure:", res.data);
        toast.error("Unexpected data format received");
        return;
      }
      
      console.log("Fetched users:", fetchedUsers);
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    } catch (err) {
      console.error("Fetch users error:", err);
      toast.error("Failed to fetch users");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({ status: user.status || "pending" });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://api.strategemmedia.com/api/users/update/${selectedUser._id || selectedUser.id}`,
        {
          status: editForm.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("User status updated successfully");
      const updated = users.map((u) =>
        (u._id || u.id) === (selectedUser._id || selectedUser.id) 
          ? { ...u, status: editForm.status } 
          : u
      );
      setUsers(updated);
      setFilteredUsers(updated);
      setEditModalOpen(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (user) => {
    // Debug: Log the user object to see its structure
    console.log("User object for deletion:", user);
    
    // Check if user has an ID
    if (!user || (!user._id && !user.id)) {
      toast.error("User ID not found. Cannot delete user.");
      console.error("User object missing ID:", user);
      return;
    }
    
    // Use either _id or id field
    const userId = user._id || user.id;
    
    try {
      await axios.delete(
        `https://api.strategemmedia.com/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updated = users.filter((u) => (u._id || u.id) !== userId);
      setUsers(updated);
      setFilteredUsers(updated);
      toast.success("User deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://api.strategemmedia.com/api/register", addForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message || "User created");
      setAddModalOpen(false);
      setAddForm({ name: "", email: "", password: "", phone: "", role: "user" });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add user");
    }
  };

  const isAddUserPage = location.pathname.includes("adduser");

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700 mx-2 sm:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <AddUserModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddUser}
        form={addForm}
        setForm={setAddForm}
      />

      {!isAddUserPage && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-4 sm:mb-6">Users</h2>
            <hr className="w-full h-1 bg-slate-500 rounded-sm" />
            <div className="my-4 sm:my-5 flex flex-col sm:flex-row justify-center lg:justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full sm:w-64 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <button
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                onClick={() => setAddModalOpen(true)}
              >
                Add User
              </button>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user._id || user.id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-700 rounded-lg p-4 mb-4 border border-gray-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-100">{user.name}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === "active"
                        ? "bg-green-600 text-green-100"
                        : user.status === "deactive"
                        ? "bg-red-600 text-red-100"
                        : user.status === "pending"
                        ? "bg-yellow-600 text-yellow-100"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {user.status || "pending"}
                  </span>
                </div>
                <div className="flex justify-end space-x-2">
                  <button 
                    className="text-indigo-400 hover:text-indigo-300 text-sm" 
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-400 hover:text-red-300 text-sm" 
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Sr No.</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id || user.id || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-300">{index + 1}</td>
                    <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-100">{user.name}</td>
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-300">{user.email}</td>
                    <td className="px-3 sm:px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-600 text-green-100"
                            : user.status === "deactive"
                            ? "bg-red-600 text-red-100"
                            : user.status === "pending"
                            ? "bg-yellow-600 text-yellow-100"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {user.status || "pending"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-300">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3" onClick={() => handleEditClick(user)}>Edit</button>
                      <button className="text-red-400 hover:text-red-300" onClick={() => handleDelete(user)}>Delete</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white text-black rounded-lg p-4 sm:p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="w-full px-3 sm:px-4 py-2 rounded border focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 order-2 sm:order-1" 
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 order-1 sm:order-2"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Outlet />
    </motion.div>
  );
};

export default ListUser;