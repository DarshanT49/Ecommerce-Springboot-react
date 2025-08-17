import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
        <div className="px-6 py-16 md:px-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Everything you love, in one place.
            </h1>
            <p className="mt-3 md:mt-4 text-white/90 max-w-xl">
              Shop curated electronics, fashion, and essentials. Fast shipping,
              easy returns, and secure checkout.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-md bg-white text-blue-700 font-semibold px-5 py-2.5 hover:bg-blue-50"
              >
                Shop Now
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-md bg-white/10 text-white font-semibold px-5 py-2.5 ring-1 ring-white/40 hover:bg-white/20"
              >
                Browse Categories
              </a>
            </div>
          </div>

          {/* Decorative mock image */}
          <div className="flex-1 w-full">
            <div className="relative mx-auto h-48 md:h-64 lg:h-72 w-full max-w-md">
              <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-4 rounded-xl bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Feature
          title="Assured Quality"
          text="Hand-picked products from verified brands."
        />
        <Feature
          title="Fast Delivery"
          text="Quick shipping with real-time tracking."
        />
        <Feature
          title="Secure Payments"
          text="Encrypted checkout with multiple options."
        />
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="space-y-4">
        <h2 className="text-xl font-bold">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CategoryCard name="Laptops" />
          <CategoryCard name="Mobiles" />
          <CategoryCard name="Headphones" />
          <CategoryCard name="Wearables" />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="rounded-xl border bg-white p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">New arrivals dropping weekly</h3>
          <p className="text-gray-600">
            Stay ahead of the curve with the latest products.
          </p>
        </div>
        <Link
          to="/products"
          className="rounded-md bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700"
        >
          Explore Products
        </Link>
      </section>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-gray-600 mt-1">{text}</p>
    </div>
  );
}

function CategoryCard({ name }) {
  return (
    <div className="rounded-xl border bg-white p-5 hover:shadow-md transition">
      <div className="h-24 rounded-md bg-gray-100 mb-4" />
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>
        <Link
          to="/products"
          className="text-sm text-blue-600 hover:underline"
          title={`View ${name}`}
        >
          View
        </Link>
      </div>
    </div>
  );
}
