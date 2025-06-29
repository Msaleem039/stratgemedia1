import { useSelector } from "react-redux";
import { useState } from "react";

const Profile = () => {
  // Get user from Redux (or use dummy data if not available)
  const reduxUser = useSelector((state) => state.auth.auth);
  
  // Dummy user data (fallback if Redux doesn't have data)
  const dummyUser = {
    id: "usr_78901",
    name: "Alex Johnson",
    email: "alex.johnson@strategemedia.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    jobTitle: "Senior Media Strategist",
    company: "Strategemedia Inc.",
    role: "Admin",
    department: "Strategy & Planning",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Digital media strategist with 8+ years experience in campaign planning and execution. Specializing in performance marketing and data-driven decision making.",
    joinedAt: "2021-06-15T10:00:00Z",
    updatedAt: "2023-11-20T14:30:00Z",
    socialLinks: {
      twitter: "https://twitter.com/alexj",
      linkedin: "https://linkedin.com/in/alexjohnson",
      portfolio: "https://alexjohnson.design"
    },
    skills: ["Media Buying", "Audience Analysis", "ROI Optimization", "Campaign Management"],
    stats: {
      campaigns: 47,
      clients: 23,
      performance: 92 // out of 100
    }
  };

  // Use Redux user if available, otherwise use dummy data
  const user = reduxUser || dummyUser;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    jobTitle: user.jobTitle,
    company: user.company,
    phone: user.phone,
    bio: user.bio
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically dispatch an action to update the user in Redux/backend
    console.log("Saving profile changes:", formData);
    setIsEditing(false);
  };

  // Helper for avatar initial
  const getInitial = (name, email) => {
    if (name && name.length > 0) return name[0].toUpperCase();
    if (email && email.length > 0) return email[0].toUpperCase();
    return "U";
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
      
      {/* Profile Card */}
      <div className="bg-[#181F36] rounded-2xl p-8 shadow-lg border border-[#232946] mb-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-white">Profile Information</h3>
          {isEditing ? (
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
              <button 
                onClick={handleEditToggle}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={handleEditToggle}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-start gap-8 mb-8">
          <div className="flex flex-col items-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500 shadow-md mb-4"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-white border-2 border-indigo-500 shadow-md mb-4">
                {getInitial(user?.name, user?.email)}
              </div>
            )}
            {isEditing && (
              <button className="text-sm text-blue-400 hover:underline">
                Change Photo
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <div className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600">
                    {user.name}
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <div className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600">
                    {user.email}
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-1">Job Title</label>
                {isEditing ? (
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <div className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600">
                    {user.jobTitle}
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-1">Company</label>
                {isEditing ? (
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <div className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600">
                    {user.company}
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-1">Phone</label>
                {isEditing ? (
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <div className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600">
                    {user.phone || "Not provided"}
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-1">Role</label>
                <div className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600">
                  {user.role}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <div className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 min-h-[80px]">
                  {user.bio || "No bio provided"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Card */}
        <div className="bg-[#181F36] rounded-2xl p-6 shadow-lg border border-[#232946]">
          <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Campaigns Managed</span>
              <span className="font-bold text-white">{user.stats?.campaigns || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active Clients</span>
              <span className="font-bold text-white">{user.stats?.clients || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Performance Score</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${user.stats?.performance || 0}%` }}
                  ></div>
                </div>
                <span className="font-bold text-white">{user.stats?.performance || 0}/100</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Card */}
        <div className="bg-[#181F36] rounded-2xl p-6 shadow-lg border border-[#232946]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Skills & Expertise</h3>
            {isEditing && (
              <button className="text-sm text-blue-400 hover:underline">
                Edit Skills
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
            {(!user.skills || user.skills.length === 0) && (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>
        
        {/* Social Links Card */}
        <div className="bg-[#181F36] rounded-2xl p-6 shadow-lg border border-[#232946] md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Social Links</h3>
            {isEditing && (
              <button className="text-sm text-blue-400 hover:underline">
                Add Links
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            {user.socialLinks?.twitter && (
              <a 
                href={user.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                Twitter
              </a>
            )}
            {user.socialLinks?.linkedin && (
              <a 
                href={user.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            )}
            {user.socialLinks?.portfolio && (
              <a 
                href={user.socialLinks.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
                Portfolio
              </a>
            )}
            {(!user.socialLinks || 
              (!user.socialLinks.twitter && !user.socialLinks.linkedin && !user.socialLinks.portfolio)) && (
              <span className="text-gray-500">No social links added</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;