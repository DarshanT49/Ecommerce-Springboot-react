import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from Spring Boot backend
    axios
      .get("http://localhost:8080/api/products") // your Spring Boot endpoint
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.descroption}</p>
            <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>

            <Link
              to={`/products/${product.id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
