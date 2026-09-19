import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getProducts } from "../product.service";
import type { Product } from "../product.types";

const CATEGORIES = ["All", "Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports & Fitness", "Furniture"];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({
      category: activeCategory === "All" ? undefined : activeCategory,
      limit: 100,
    })
      .then((data) => setProducts(data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const selectCategory = (cat: string) => {
    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="font-[Fraunces] text-3xl sm:text-4xl text-[#1C2127]">Curated Collection</h1>
        <p className="text-sm text-[#6F7268] mt-1">Discover meticulously crafted everyday essentials.</p>
      </div>

      {/* Category Pills & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Horizontal scrollable category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeCategory === cat
                ? "bg-[#1C2127] text-[#EFEEE8] shadow-sm"
                : "bg-white border border-[#D8D6CC] text-[#6F7268] hover:border-[#AD8A3E] hover:text-[#1C2127]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full sm:w-48 bg-white border border-[#D8D6CC] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#AD8A3E]"
          />
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="aspect-square bg-[#E4E2D9] rounded-xl" />
              <div className="h-4 bg-[#E4E2D9] rounded w-3/4" />
              <div className="h-3 bg-[#E4E2D9] rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 bg-white border border-[#D8D6CC] rounded-2xl p-8">
          <p className="font-[Fraunces] text-xl text-[#1C2127]">No products found</p>
          <p className="text-xs text-[#6F7268] mt-1 mb-4">Try choosing a different category or clearing your search.</p>
          <button
            onClick={() => { selectCategory("All"); setSearch(""); }}
            className="bg-[#1C2127] text-[#EFEEE8] px-4 py-2 rounded-lg text-xs hover:bg-[#AD8A3E] transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((p) => (
            <Link
              key={p._id}
              to={`/products/${p._id}`}
              className="group bg-white border border-[#D8D6CC] rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-[#E4E2D9] relative">
                <img
                  src={p.imageUrl || p.images?.[0] || "https://picsum.photos/400"}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#1C2127]/80 backdrop-blur-sm text-[#EFEEE8] text-[10px] font-medium px-2 py-0.5 rounded">
                  {p.category}
                </span>
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-medium text-[#1C2127] line-clamp-1 group-hover:text-[#AD8A3E] transition-colors">
                    {p.name}
                  </h2>
                  <p className="text-xs text-[#6F7268] line-clamp-1 mt-0.5">{p.description}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#AD8A3E]">₹{p.price}</span>
                  <span className={`text-[10px] ${p.stock < 5 ? "text-[#B3435A] font-medium" : "text-[#6F7268]"}`}>
                    {p.stock > 0 ? `${p.stock} left` : "Out of stock"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;