"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, resetAddLoading } from "@/redux/product/productSlice";

const categories = ["dubbing", "Subtitls", "AI-Archive"];

const AddSubtitleVideo = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    videoUrl: "",
    category: "",
    image: "",
  });

  const dispatch = useDispatch();
  const addLoading = useSelector((state) => state.products.addLoading);

  // ✅ Reset loader on mount
  useEffect(() => {
    dispatch(resetAddLoading());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
    }
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
  
	if (
	  !newProduct.title ||
	  !newProduct.videoUrl ||
	  !newProduct.category ||
	  !newProduct.image
	) {
	  toast.warn("Please fill all fields and select a thumbnail image.");
	  return;
	}
  
	dispatch(addProduct(newProduct))
	  .unwrap()
	  .then(() => {
		toast.success("Video uploaded successfully!");
		setNewProduct({
		  title: "",
		  videoUrl: "",
		  category: "",
		  image: "",
		});
		dispatch(resetAddLoading()); // ✅ Reset loading after success
	  })
	  .catch((err) => {
		toast.error(err?.message || "Something went wrong!");
		dispatch(resetAddLoading()); // ✅ Reset loading after failure
	  });
  };
  

  return (
    <motion.div
      className="bg-[#172030] shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Video Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct((prev) => ({ ...prev, title: e.target.value }))}
          required
          className="w-full px-3 py-2 bg-gray-700 text-white rounded"
        />

        <input
          type="text"
          placeholder="Video URL"
          value={newProduct.videoUrl}
          onChange={(e) => setNewProduct((prev) => ({ ...prev, videoUrl: e.target.value }))}
          required
          className="w-full px-3 py-2 bg-gray-700 text-white rounded"
        />

        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))}
          required
          className="w-full px-3 py-2 bg-gray-700 text-white rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div>
          <label className="text-white mb-1 block">Thumbnail Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="preview"
              className="mt-3 h-24 rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={addLoading}
          className="w-full py-2 px-4 bg-[#7C63F0] text-white rounded hover:bg-emerald-700"
        >
          {addLoading ? (
            <>
              <Loader className="inline-block mr-2 h-5 w-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <PlusCircle className="inline-block mr-2 h-5 w-5" />
              Upload Video
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddSubtitleVideo;
