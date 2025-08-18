import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import Register from './pages/Register';
import LoginPage from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import './App.css'

function App() {

  return (
    <>
        <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/UserDashboard' element={<UserDashboard />} />
        </Routes>
      </main>
    </div>

    </>
  )
}

export default App
