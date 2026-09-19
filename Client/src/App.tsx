import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router";
import Home, { BRAND } from "./features/Home";
import AdminLogin from "./features/auth/pages/AdminLogin";
import ProductsPage from "./features/products/products/ProductsPage";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ---------- NAV ---------- */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
          ? "bg-[#EFEEE8]/80 backdrop-blur-md border-b border-[#D8D6CC] py-3"
          : "bg-transparent py-5 border-b border-transparent"
          }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6">
          <Link to="/" className="font-[Fraunces] text-xl">
            {BRAND}
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link to="/products" className="hover:text-[#AD8A3E] transition-colors">
              Products
            </Link>
            <a href="#categories" className="hover:text-[#AD8A3E] transition-colors">
              Categories
            </a>
            <Link to="/admin/login" className="hover:text-[#AD8A3E] transition-colors">
              Admin
            </Link>
          </div>

          <Link
            to="/products"
            className="text-sm bg-[#1C2127] text-[#EFEEE8] px-4 py-2 hover:bg-[#AD8A3E] transition-colors"
          >
            Shop now
          </Link>
        </nav>
      </header>

      {/* ---------- ROUTES ---------- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
};

export default App;