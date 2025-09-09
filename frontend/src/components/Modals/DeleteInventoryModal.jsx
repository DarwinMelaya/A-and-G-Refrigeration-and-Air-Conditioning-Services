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
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-full flex items-center justify-center p-4">
        <div
          className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete Inventory Item
            </h3>
            <button
              onClick={onClose}
              className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-600">
              Are you sure you want to delete "{item.name}"? This action cannot
              be undone.
            </p>
          </div>
          <div className="px-6 py-4 border-t flex items-center justify-end gap-2 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-white"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
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
