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
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div
          className="w-full max-w-lg bg-white rounded-lg border border-gray-200 shadow-lg relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between px-6 py-4 border-b">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Edit Inventory Item
              </h2>
              <p className="text-sm text-gray-500">
                Update product details and stock information.
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </div>
          <form onSubmit={submit} className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-md transition bg-white"
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
                className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-md transition bg-white"
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
                className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-md transition bg-white"
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
                className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-md transition bg-white"
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
                className="w-full border border-gray-200 p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border border-gray-200 shadow-sm mb-2"
                />
              </div>
            )}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
            {error && (
              <div className="text-red-600 text-center font-medium">
                {error}
              </div>
            )}
          </form>
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
};

export default EditInventoryModal;
