import { useState } from "react";
import axios from "axios";

const AddInventoryModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [stock, setStock] = useState(0);

  if (!isOpen) return null;

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

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setPicture("");
    setPreview(null);
    setStock(0);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/admin/inventory",
        { name, price, picture, description, stock },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const successMsg = "Inventory item added successfully!";
      setMessage(successMsg);
      if (onSuccess) onSuccess(successMsg);
      resetForm();
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add inventory item.");
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
                Add Inventory Item
              </h2>
              <p className="text-sm text-gray-500">
                Create a new product and set its initial details.
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
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
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
                placeholder="Price"
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
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-md transition bg-white"
                required
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Stock
              </label>
              <input
                type="number"
                placeholder="0"
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
                required
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
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Inventory"}
              </button>
            </div>
            {message && (
              <div className="text-green-600 text-center font-medium">
                {message}
              </div>
            )}
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

export default AddInventoryModal;
