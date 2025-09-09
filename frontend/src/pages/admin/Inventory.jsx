import Layout from "../../components/Layout/Layout";
import { FiFilter, FiPlus } from "react-icons/fi"; // For filter icon
import { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [stock, setStock] = useState(0);

  // Add stock modal state
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [stockItemId, setStockItemId] = useState(null);
  const [stockAmount, setStockAmount] = useState(0);

  // Dashboard summary (mocked for now)
  const totalStockValue = inventory.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );
  const totalProducts = inventory.length;
  const lowStockCount = inventory.filter(
    (item) => (item.stock || 0) < 10
  ).length;

  // Filtered inventory for search (UI only)
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/admin/inventory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInventory(res.data.items);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchInventory();
  }, [message]); // refetch when message changes (i.e., after add or stock update)

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
      setMessage("Inventory item added successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setPicture("");
      setPreview(null);
      setStock(0);
      setModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add inventory item.");
    } finally {
      setLoading(false);
    }
  };

  const openAddStockModal = (id) => {
    setStockItemId(id);
    setStockAmount(0);
    setStockModalOpen(true);
  };

  const submitAddStock = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/admin/inventory/${stockItemId}/stock`,
        { amount: Number(stockAmount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Stock updated successfully!");
      setStockModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update stock.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-4">
        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <span className="text-gray-500 text-sm">Total Stock Value</span>
            <span className="text-2xl font-bold text-gray-800 mt-1">
              ₱{totalStockValue.toLocaleString()}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <span className="text-gray-500 text-sm">Total Products</span>
            <span className="text-2xl font-bold text-gray-800 mt-1">
              {totalProducts}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <span className="text-gray-500 text-sm">Low Stock</span>
            <span className="text-2xl font-bold text-red-600 mt-1">
              {lowStockCount}
            </span>
          </div>
        </div>

        {/* Search, Filter, and Add Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search order..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition">
              <FiFilter />
              Filter
            </button>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition font-semibold"
          >
            <FiPlus />
            Add Inventory Item
          </button>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-2xl shadow-lg p-4 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-gray-600 text-sm font-semibold border-b">
                <th className="px-3 py-2">
                  <input type="checkbox" />
                </th>
                <th className="px-3 py-2 text-left">Product Name</th>
                <th className="px-3 py-2 text-left">Price</th>
                <th className="px-3 py-2 text-left">Description</th>
                <th className="px-3 py-2 text-left">Stock</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-400 text-lg"
                  >
                    No inventory items found.
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => (
                  <tr key={item._id} className="hover:bg-blue-50 transition">
                    <td className="px-3 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="px-3 py-2 flex items-center gap-3">
                      <img
                        src={item.picture}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="font-medium text-gray-800">
                        {item.name}
                      </span>
                    </td>
                    <td className="px-3 py-2">₱{item.price.toFixed(2)}</td>
                    <td className="px-3 py-2">{item.description}</td>
                    <td className="px-3 py-2">{item.stock || 0}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => openAddStockModal(item._id)}
                        className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded"
                      >
                        Add Stock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add Inventory Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Add Inventory Item
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
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
                    placeholder="Price"
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
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition"
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
                    required
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
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold text-lg shadow hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Inventory"}
                </button>
                {message && (
                  <div className="text-green-600 text-center font-medium mt-2">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="text-red-600 text-center font-medium mt-2">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Add Stock Modal */}
        {stockModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
              <button
                onClick={() => setStockModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Add Stock
              </h3>
              <form onSubmit={submitAddStock} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={stockAmount}
                    onChange={(e) => setStockAmount(e.target.value)}
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition"
                    step="1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold shadow"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                {error && (
                  <div className="text-red-600 text-center font-medium mt-2">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Inventory;
