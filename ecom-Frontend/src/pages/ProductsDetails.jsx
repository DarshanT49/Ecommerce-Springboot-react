import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch single product from Spring Boot backend
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <p className="p-6">Loading product details...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.descroption}</p>
      <p className="text-green-600 font-semibold text-lg">₹{product.price}</p>

      <div className="mt-4 space-y-2">
        <p>
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>
        <p>
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p>
          <span className="font-semibold">Release Date:</span>{" "}
          {new Date(product.relaseDate).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Available:</span>{" "}
          {product.available ? "Yes ✅" : "No ❌"}
        </p>
        <p>
          <span className="font-semibold">Quantity:</span> {product.quantity}
        </p>
      </div>

      <Link
        to="/products"
        className="mt-6 inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        Back to Products
      </Link>
    </div>
  );
}

export default ProductDetails;
