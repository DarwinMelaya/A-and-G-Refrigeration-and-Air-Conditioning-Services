import { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import Layout from "../../components/Layout/Layout";

const Inventory = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    imageBase64: "",
  });
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch inventory items from Supabase
  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("name");
    if (!error) setItems(data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Convert image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imageBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, imageBase64 } = form;
    if (!name || !price || !imageBase64) {
      setMessage("Name, price, and image are required.");
      return;
    }
    const { error } = await supabase
      .from("inventory")
      .insert([{ name, price, description, image_base64: imageBase64 }]);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Inventory item added!");
      setForm({
        name: "",
        price: "",
        description: "",
        image: null,
        imageBase64: "",
      });
      fetchItems();
      setModalOpen(false); // Close modal on success
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-700 to-green-500 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Add Inventory Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-green-400 text-white font-bold py-2 px-6 rounded-lg shadow hover:from-blue-700 hover:to-green-500 transition"
            >
              Add Inventory
            </button>
          </div>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-md relative">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-3 right-3 text-blue-700 hover:text-green-500 text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-extrabold text-blue-700 mb-6 tracking-tight">
                  Add Inventory Item
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-blue-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-700 mb-1">
                      Picture
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-blue-200 bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-green-400 text-white font-bold py-2 rounded-lg shadow hover:from-blue-700 hover:to-green-500 transition"
                  >
                    Add Inventory
                  </button>
                  {message && (
                    <p className="text-center text-sm font-semibold text-green-700 mt-2">
                      {message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Inventory List */}
          <div className="bg-white/80 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-extrabold text-blue-700 mb-6 tracking-tight">
              Inventory List
            </h2>
            {items.length === 0 ? (
              <p className="text-blue-700">No inventory items found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow border border-green-100 flex flex-col items-center p-4"
                  >
                    {item.image_base64 && (
                      <img
                        src={item.image_base64}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded mb-3 border border-blue-100"
                      />
                    )}
                    <h3 className="text-lg font-bold text-blue-700 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-green-700 font-semibold mb-1">
                      ₱{item.price}
                    </p>
                    <p className="text-gray-700 text-sm text-center">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;
