import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const linkInactive = "text-gray-700 hover:text-blue-600";
  const linkActive = "text-blue-600 bg-blue-50";

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              E
            </span>
            <span className="text-xl font-semibold text-gray-900">E-Shop</span>
          </Link>

          {/* Middle: Search (desktop) */}
          <div className="hidden md:flex flex-1 mx-6 relative">
            <div className="w-full">
              <label htmlFor="q" className="sr-only">
                Search
              </label>
              <div className="flex">
                <input
                  id="q"
                  name="q"
                  type="text"
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Search for products, brands, and more"
                  className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* <button
                  type="button"
                  className="border border-l-0 border-gray-300 rounded-r-md px-4 py-2 font-medium hover:bg-gray-50"
                >
                  Search
                </button> */}
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute bg-white border mt-1 w-full max-h-64 overflow-y-auto rounded-md shadow-lg z-50">
                  {noResults ? (
                    <p className="p-3 text-sm text-gray-500">No results found.</p>
                  ) : (
                    searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/products/${item.id}`}
                        className="block px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
                        onClick={() => {
                          setShowSearchResults(false);
                          setInput("");
                        }}
                      >
                        {item.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Links + Cart (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Cart
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Account
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg
              className={`h-5 w-5 ${open ? "hidden" : "block"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`h-5 w-5 ${open ? "block" : "hidden"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile: Search + Links */}
        <div className={`md:hidden ${open ? "block" : "hidden"} pb-4`}>
          <div className="mb-3 relative">
            <label htmlFor="q-m" className="sr-only">
              Search
            </label>
            <div className="flex">
              <input
                id="q-m"
                name="q"
                type="text"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search for products"
                className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="border border-l-0 border-gray-300 rounded-r-md px-4 py-2 font-medium hover:bg-gray-50"
              >
                Search
              </button>
            </div>

            {/* Mobile Results */}
            {showSearchResults && (
              <div className="absolute bg-white border mt-1 w-full max-h-64 overflow-y-auto rounded-md shadow-lg z-50">
                {noResults ? (
                  <p className="p-3 text-sm text-gray-500">No results found.</p>
                ) : (
                  searchResults.map((item) => (
                    <Link
                      key={item.id}
                      to={`/products/${item.id}`}
                      className="block px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
                      onClick={() => {
                        setShowSearchResults(false);
                        setInput("");
                      }}
                    >
                      {item.name}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Cart
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Account
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
