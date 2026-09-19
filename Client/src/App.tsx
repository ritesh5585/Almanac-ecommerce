import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router";
import { useAuth } from "./features/auth/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

import Home, { BRAND } from "./features/Home";
import AdminLogin from "./features/auth/pages/AdminLogin";
import ProductsPage from "./features/products/pages/ProductsPage";
import ProductDetailPage from "./features/products/pages/ProductDetailPage";
import AdminProducts from "./features/products/pages/AdminProducts";
import ProductForm from "./features/products/pages/ProductForm";

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#EFEEE8] text-[#1C2127]">
      {/* Header / Nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
            ? "bg-[#EFEEE8]/90 backdrop-blur-md border-b border-[#D8D6CC] py-3 shadow-xs"
            : "bg-transparent py-4 border-b border-transparent"
          }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-[Fraunces] text-2xl tracking-tight text-[#1C2127]">
            {BRAND}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-sm">
            <Link to="/products" className="hover:text-[#AD8A3E] transition-colors">
              Products
            </Link>
            <Link to="/#categories" className="hover:text-[#AD8A3E] transition-colors">
              Categories
            </Link>
            <Link
              to={isAuthenticated ? "/admin/products" : "/admin/login"}
              className={`hover:text-[#AD8A3E] transition-colors flex items-center gap-1.5 ${isAuthenticated ? "text-[#AD8A3E] font-medium" : ""
                }`}
            >
              <span>Admin</span>
              {isAuthenticated && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3E]" />
              )}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/products"
                  className="text-xs bg-white border border-[#D8D6CC] px-3 py-1.5 rounded-lg hover:border-[#AD8A3E] transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-[#B3435A] hover:underline px-2 py-1.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/products"
                className="text-xs bg-[#1C2127] text-[#EFEEE8] px-4 py-2 rounded-lg hover:bg-[#AD8A3E] transition-colors font-medium"
              >
                Shop Now
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1C2127] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#D8D6CC] px-6 py-5 shadow-lg flex flex-col gap-4">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-1 text-[#1C2127] hover:text-[#AD8A3E]"
            >
              All Products
            </Link>
            <Link
              to="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-1 text-[#1C2127] hover:text-[#AD8A3E]"
            >
              Categories
            </Link>
            <Link
              to={isAuthenticated ? "/admin/products" : "/admin/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-1 text-[#1C2127] hover:text-[#AD8A3E] flex items-center justify-between"
            >
              <span>{isAuthenticated ? "Admin Inventory" : "Admin Login"}</span>
              {isAuthenticated && <span className="text-xs bg-[#AD8A3E]/10 text-[#AD8A3E] px-2 py-0.5 rounded">Active</span>}
            </Link>

            {isAuthenticated ? (
              <div className="pt-2 border-t border-[#D8D6CC] flex justify-between items-center">
                <Link
                  to="/admin/products/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-medium text-[#AD8A3E]"
                >
                  + Add New Product
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-xs text-[#B3435A] font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#1C2127] text-[#EFEEE8] py-2.5 rounded-lg text-xs font-medium mt-1"
              >
                Shop Collection
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/products" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoutes>
                <AdminProducts />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedRoutes>
                <ProductForm />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <ProtectedRoutes>
                <ProductForm />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;