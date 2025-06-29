import { motion } from "framer-motion";
import { User } from "lucide-react";

const SettingSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur-md shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        <User className="text-indigo-400 mr-3 w-6 h-6" aria-hidden="true" />
        <h2 className="text-lg md:text-xl font-semibold text-white">
          Profile
        </h2>
      </div>

      <div className="text-gray-300 text-sm md:text-base space-y-4">
        <div className="flex items-center gap-4">
          <img
            src="https://randomuser.me/api/portraits/men/5.jpg"
            alt="User"
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-md"
          />
          <div>
            <p className="text-white font-medium text-base">Imran Kashif</p>
            <p className="text-gray-400 text-sm">imran.doe@example.com</p>
          </div>
        </div>

        <div className="pt-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default SettingSection;

