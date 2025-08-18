import { useState } from "react";

const UserDashboard = () => {
  // Dummy User Data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Customer",
    joined: "2023-08-01",
    profileImage: "https://via.placeholder.com/150",

    orders: [
      { id: 1, name: "Wireless Headphones", amount: 120, rating: 4 },
      { id: 2, name: "Gaming Mouse", amount: 45, rating: 5 },
      { id: 3, name: "Mechanical Keyboard", amount: 89, rating: 3 },
    ],

    wishlist: [
      { id: 1, product: "MacBook Pro 16", price: "$2499" },
      { id: 2, product: "Nike Air Jordan", price: "$199" },
    ],

    addresses: [
      {
        name: "John Doe",
        street: "123, Park Avenue",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
        phone: "+1 234 567 890",
      },
      {
        name: "Jane Doe",
        street: "45, MG Road",
        city: "Mumbai",
        state: "MH",
        zip: "400001",
        country: "India",
        phone: "+91 98765 43210",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">User Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border mb-4"
          />
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">Role: {user.role}</p>
          <p className="text-sm text-gray-500">Joined: {user.joined}</p>

          <div className="mt-4 flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Edit Profile
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
          <ul className="space-y-4">
            {user.orders.map((order) => (
              <li
                key={order.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-semibold">{order.name}</p>
                  <p className="text-gray-500">${order.amount}</p>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < order.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Wishlist Section */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">My Wishlist</h3>
          <div className="grid gap-4">
            {user.wishlist.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:shadow flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">{item.product}</h4>
                  <p className="text-gray-600">{item.price}</p>
                </div>
                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

       {/* Address Section */}
<div className="bg-white shadow-md rounded-2xl p-6">
  <h3 className="text-xl font-bold mb-4">My Addresses</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {user.addresses.map((addr, index) => (
      <div
        key={index}
        className="border rounded-lg p-4 hover:shadow flex flex-col gap-2"
      >
        <p className="font-semibold">{addr.name}</p>
        <p className="text-gray-600">{addr.street}</p>
        <p className="text-gray-600">
          {addr.city}, {addr.state} - {addr.zip}
        </p>
        <p className="text-gray-600">{addr.country}</p>
        <p className="text-gray-600">Phone: {addr.phone}</p>

        <div className="flex gap-2 mt-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
            Edit
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
    + Add New Address
  </button>
</div>

      </div>
    </div>
  );
};

export default UserDashboard;
