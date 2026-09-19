import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getProducts, deleteProduct } from "../product.service";
import type { Product } from "../product.types";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = () => {
    getProducts({ limit: 200 })
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-[#6F7268]">
        <div className="w-5 h-5 border-2 border-[#AD8A3E] border-t-transparent rounded-full animate-spin mr-3" />
        Loading admin products...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-[Fraunces] text-2xl sm:text-3xl">Manage Products</h1>
          <p className="text-sm text-[#6F7268] mt-1">{products.length} products total in inventory</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center bg-[#1C2127] text-[#EFEEE8] px-5 py-2.5 text-sm font-medium hover:bg-[#AD8A3E] transition-colors rounded-lg shadow-sm"
        >
          + Add New Product
        </Link>
      </div>

      {/* Search Filter */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inventory by title or category..."
          className="w-full sm:max-w-md bg-white border border-[#D8D6CC] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#AD8A3E] shadow-sm"
        />
      </div>

      {/* Mobile Card View (hidden on desktop) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {filtered.map((p) => (
          <div key={p._id} className="bg-white border border-[#D8D6CC] rounded-xl p-4 flex gap-3.5 items-center">
            <img
              src={p.imageUrl || p.images?.[0] || "https://picsum.photos/100"}
              alt={p.name}
              className="w-16 h-16 rounded-lg object-cover bg-[#E4E2D9] flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate">{p.name}</h3>
              <p className="text-xs text-[#6F7268] mt-0.5">{p.category} · ₹{p.price}</p>
              <p className={`text-xs mt-1 ${p.stock < 10 ? "text-[#B3435A] font-medium" : "text-[#6F7268]"}`}>
                {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <Link
                to={`/admin/products/${p._id}/edit`}
                className="text-xs text-center border border-[#1C2127] text-[#1C2127] px-3 py-1 rounded hover:bg-[#1C2127] hover:text-white transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p._id, p.name)}
                disabled={deletingId === p._id}
                className="text-xs text-[#B3435A] border border-[#B3435A]/30 px-3 py-1 rounded hover:bg-[#B3435A] hover:text-white transition disabled:opacity-50"
              >
                {deletingId === p._id ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center py-10 text-sm text-[#6F7268]">No matching products found.</p>
        )}
      </div>

      {/* Desktop Table View (hidden on mobile) */}
      <div className="hidden md:block bg-white border border-[#D8D6CC] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#FAF9F5] border-b border-[#D8D6CC] text-xs uppercase tracking-wider text-[#6F7268]">
            <tr>
              <th className="py-3 px-4">Item</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEEE8]">
            {filtered.map((p) => (
              <tr key={p._id} className="hover:bg-[#FAF9F5] transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={p.imageUrl || p.images?.[0] || "https://picsum.photos/100"}
                    alt={p.name}
                    className="w-10 h-10 rounded-md object-cover bg-[#E4E2D9]"
                  />
                  <span className="font-medium max-w-[280px] truncate">{p.name}</span>
                </td>
                <td className="py-3 px-4 text-[#6F7268]">{p.category}</td>
                <td className="py-3 px-4 font-medium text-[#AD8A3E]">₹{p.price}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs ${p.stock < 10 ? "bg-red-50 text-[#B3435A] font-medium" : "bg-green-50 text-green-700"}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-3">
                  <Link
                    to={`/admin/products/${p._id}/edit`}
                    className="text-xs font-medium text-[#AD8A3E] hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id, p.name)}
                    disabled={deletingId === p._id}
                    className="text-xs font-medium text-[#B3435A] hover:underline disabled:opacity-50"
                  >
                    {deletingId === p._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-12 text-sm text-[#6F7268]">No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;