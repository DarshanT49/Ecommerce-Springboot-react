import React, { useState, useEffect } from "react";
import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    descroption: "",
    brand: "",
    price: "",
    category: "",
    relaseDate: "",
    available: false,
    quantity: "",
  });

  // Fetch all products
  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("❌ Failed to fetch products");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("✅ Product Added Successfully!");
        setProduct({
          name: "",
          descroption: "",
          brand: "",
          price: "",
          category: "",
          relaseDate: "",
          available: false,
          quantity: "",
        });
        fetchProducts(); // Refresh products
      } else {
        alert("❌ Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong");
    }
  };

  // Delete Product
const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("🗑️ Product deleted successfully!");
        fetchProducts(); // Refresh product list
      } else {
        alert("❌ Failed to delete product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong while deleting");
    }
  }
};

// Edit Product
const handleEdit = (p) => {
  setProduct(p); // Prefill form with product details
  setActiveTab("products"); // Switch to products tab (already there)
};

// Update Product
const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/${product.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );

    if (response.ok) {
      alert("✏️ Product updated successfully!");
      setProduct({
        name: "",
        descroption: "",
        brand: "",
        price: "",
        category: "",
        relaseDate: "",
        available: false,
        quantity: "",
      });
      fetchProducts(); // Refresh products
    } else {
      alert("❌ Failed to update product");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("❌ Something went wrong while updating");
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
          Admin Panel
        </h2>
        <nav className="flex-1 p-4 space-y-3">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded ${
              activeTab === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaChartLine /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded ${
              activeTab === "products" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaBox /> Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded ${
              activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaShoppingCart /> Orders
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded ${
              activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaUsers /> Users
          </button>
        </nav>
        <button className="flex items-center gap-2 p-4 border-t border-gray-700 hover:bg-gray-700">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                Total Sales: $25,000
              </div>
              <div className="bg-white p-4 rounded-lg shadow">Orders: 320</div>
              <div className="bg-white p-4 rounded-lg shadow">Users: 150</div>
              <div className="bg-white p-4 rounded-lg shadow">Products: 45</div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

            {/* Add Product Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow mb-6 grid grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="descroption"
                value={product.descroption}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Category"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                name="relaseDate"
                value={product.relaseDate}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="available"
                  checked={product.available}
                  onChange={handleChange}
                />
                <label>Available</label>
              </div>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="border p-2 rounded"
                required
              />
              {/* <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
                >
                  Add Product
                </button>
              </div> */}
              <div className="col-span-2">
  <button
    type="submit"
    onClick={product.id ? handleUpdate : handleSubmit}
    className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
  >
    {product.id ? "Update Product" : "Add Product"}
  </button>
</div>

            </form>

            {/* Product List */}
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Brand</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Release Date</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Available</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.descroption}</td>
                    <td className="p-2">{p.brand}</td>
                    <td className="p-2">${p.price}</td>
                    <td className="p-2">{p.category}</td>
                    <td className="p-2">{p.relaseDate}</td>
                    <td className="p-2">{p.quantity}</td>
                    <td className="p-2">
                      {p.available ? "✅ Yes" : "❌ No"}
                    </td>
                    {/* <td className="p-2 flex gap-2">
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </td> */}
                    <td className="p-2 flex gap-2">
  <button
    onClick={() => handleEdit(p)}
    className="bg-yellow-500 text-white px-2 py-1 rounded"
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(p.id)}
    className="bg-red-500 text-white px-2 py-1 rounded"
  >
    Delete
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
            <p className="text-gray-500">📦 Orders management coming soon...</p>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <p className="text-gray-500">👤 User management coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}
