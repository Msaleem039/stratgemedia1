import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { updateProduct, deleteProduct } from "../redux/product/productSlice";
import { toast } from "react-toastify";

const ProductTable = () => {
  const { products, status, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState({ open: false, product: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null });

  const openDelete = (productId) => {
    setDeleteModal({ open: true, productId });
  };

  const handleDelete = () => {
    dispatch(deleteProduct(deleteModal.productId))
      .unwrap()
      .then(() => {
        toast.success("Product deleted!");
        setDeleteModal({ open: false, productId: null });
      })
      .catch((err) => toast.error(err));
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700 mx-2 sm:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-4 sm:mb-6">
          Product Table
        </h2>
        <hr className="w-full h-1 bg-slate-500 rounded-sm" />
      </div>

      {status === "loading" && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {products?.length > 0 && (
        <>
          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-700 rounded-lg p-4 mb-4 border border-gray-600"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-16 w-16 rounded border object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-100 truncate">{product.title}</h3>
                    <p className="text-sm text-gray-400">{product.category}</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => openDelete(product._id)} 
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                  <Link
                    to={product.videoUrl}
                    target="_blank"
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    View Video
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Sr No.
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {products.map((product, index) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-12 w-12 rounded border object-cover"
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {product.title}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {product.category}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => openDelete(product._id)} 
                        className="text-red-400 mr-2 hover:text-red-300"
                      >
                        Delete
                      </button>
                      <Link
                        to={product.videoUrl}
                        target="_blank"
                        className="text-green-400 hover:text-green-300 ml-2"
                      >
                        View Video
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xs shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Delete Product?</h3>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button 
                onClick={() => setDeleteModal({ open: false, productId: null })} 
                className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 order-1 sm:order-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductTable;
