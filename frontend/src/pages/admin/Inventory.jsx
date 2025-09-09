import Layout from "../../components/Layout/Layout";
import AddInventoryModal from "../../components/Modals/AddInventoryModal";
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

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStock, setEditStock] = useState(0);
  const [editPicture, setEditPicture] = useState("");
  const [editPreview, setEditPreview] = useState(null);

  // Removed Add Stock modal/state

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

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPicture(reader.result);
        setEditPreview(reader.result);
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

  // Removed Add Stock handlers

  const openEditModal = (item) => {
    setEditItemId(item._id);
    setEditName(item.name || "");
    setEditPrice(String(item.price ?? ""));
    setEditDescription(item.description || "");
    setEditStock(Number(item.stock || 0));
    setEditPicture(item.picture || "");
    setEditPreview(item.picture || null);
    setEditModalOpen(true);
  };

  const submitEditItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/inventory/${editItemId}`,
        {
          name: editName,
          price: editPrice,
          description: editDescription,
          stock: Number(editStock),
          picture: editPicture,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Inventory item updated successfully!");
      setEditModalOpen(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update inventory item."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) return;
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Inventory item deleted successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete inventory item."
      );
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
                  <td colSpan="6" className="py-10">
                    <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                      <div className="text-4xl">📦</div>
                      <div className="font-semibold">No inventory items</div>
                      <div className="text-sm">
                        Click "Add Inventory Item" to create your first product
                      </div>
                    </div>
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
                    <td className="px-3 py-2 max-w-xs">
                      <span className="line-clamp-2 text-gray-600">
                        {item.description}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`${
                          (item.stock || 0) < 10
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        } px-2 py-1 rounded-full text-xs font-semibold`}
                      >
                        {item.stock || 0}
                      </span>
                    </td>
                    <td className="px-3 py-2 space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add Inventory Modal */}
        <AddInventoryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={(msg) => setMessage(msg)}
        />

        {/* Edit Inventory Modal */}
        {editModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 overflow-y-auto"
            onClick={() => setEditModalOpen(false)}
          >
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
              <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md relative max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="sticky top-0 float-right text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Edit Inventory Item
                </h2>
                <form
                  onSubmit={submitEditItem}
                  className="space-y-5 clear-both"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
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
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
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
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
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
                      placeholder="0"
                      value={editStock}
                      onChange={(e) => setEditStock(Number(e.target.value))}
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
                      onChange={handleEditImageChange}
                      className="w-full border border-gray-300 p-2 rounded-lg bg-gray-50"
                    />
                  </div>
                  {editPreview && (
                    <div className="flex justify-center">
                      <img
                        src={editPreview}
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
        )}
        {/* Removed Add Stock Modal */}
      </div>
    </Layout>
  );
};

export default Inventory;
