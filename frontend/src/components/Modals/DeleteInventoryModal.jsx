import axios from "axios";

const DeleteInventoryModal = ({ isOpen, item, onClose, onSuccess }) => {
  if (!isOpen || !item) return null;

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/admin/inventory/${item._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (onSuccess) onSuccess("Inventory item deleted successfully!");
      if (onClose) onClose();
    } catch (err) {
      // surface errors back through onSuccess as message could be adapted in parent
      if (onSuccess)
        onSuccess(
          err.response?.data?.message || "Failed to delete inventory item."
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div className="min-h-full flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-sm relative p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
            Delete Inventory Item
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to delete "{item.name}"? This action cannot be
            undone.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteInventoryModal;
