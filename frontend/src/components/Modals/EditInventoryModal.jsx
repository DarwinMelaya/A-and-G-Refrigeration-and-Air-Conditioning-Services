import { useState, useEffect } from "react";
import axios from "axios";

const EditInventoryModal = ({ isOpen, item, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && item) {
      setName(item.name || "");
      setPrice(String(item.price ?? ""));
      setDescription(item.description || "");
      setStock(Number(item.stock || 0));
      setPicture(item.picture || "");
      setPreview(item.picture || null);
      setError("");
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/inventory/${item._id}`,
        { name, price, description, stock: Number(stock), picture },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onSuccess) onSuccess("Inventory item updated successfully!");
      if (onClose) onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update inventory item."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md relative max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="sticky top-0 float-right text-gray-400 hover:text-gray-600 text-2xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Edit Inventory Item
          </h2>
          <form onSubmit={submit} className="space-y-5 clear-both">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition"
                required
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-2 rounded-lg bg-gray-50"
              />
            </div>
            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow mb-2"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold text-lg shadow disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            {error && (
              <div className="text-red-600 text-center font-medium mt-2">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInventoryModal;
