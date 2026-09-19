import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getProductById, deleteProduct } from "../product.service";
import { useAuth } from "../../auth/AuthContext";
import type { Product } from "../product.types";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProductById(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteProduct(id);
      navigate("/admin/products");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return (
    <div className="min-h-[50vh] flex items-center justify-center text-sm text-[#6F7268]">
      <div className="w-5 h-5 border-2 border-[#AD8A3E] border-t-transparent rounded-full animate-spin mr-3" />
      Loading product...
    </div>
  );

  if (!product) return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <h2 className="font-[Fraunces] text-2xl mb-2">Product Not Found</h2>
      <p className="text-sm text-[#6F7268] mb-6">The item you're looking for might have been removed.</p>
      <Link to="/products" className="bg-[#1C2127] text-[#EFEEE8] px-5 py-2.5 rounded-lg text-xs hover:bg-[#AD8A3E] transition">
        Browse All Products
      </Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="text-xs text-[#6F7268] flex items-center gap-1.5 mb-6">
        <Link to="/" className="hover:text-[#AD8A3E]">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#AD8A3E]">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#AD8A3E]">{product.category}</Link>
        <span>/</span>
        <span className="text-[#1C2127] truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image */}
        <div className="bg-white border border-[#D8D6CC] rounded-2xl p-3 sm:p-4 shadow-sm">
          <div className="aspect-square rounded-xl overflow-hidden bg-[#E4E2D9]">
            <img
              src={product.imageUrl || product.images?.[0] || "https://picsum.photos/600"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="self-start text-xs font-medium text-[#AD8A3E] bg-[#AD8A3E]/10 px-2.5 py-1 rounded-full mb-2">
            {product.category}
          </span>
          <h1 className="font-[Fraunces] text-2xl sm:text-3xl">{product.name}</h1>
          <p className="text-2xl font-semibold text-[#AD8A3E] mt-3">₹{product.price}</p>
          <p className="mt-4 text-sm text-[#6F7268] leading-relaxed">{product.description}</p>

          {/* Stock */}
          <div className="mt-5 flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-600" : "bg-red-500"}`} />
            <span className={product.stock < 10 && product.stock > 0 ? "text-[#B3435A] font-medium" : "text-[#6F7268]"}>
              {product.stock > 0 ? `${product.stock} items in stock` : "Out of stock"}
            </span>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-[#D8D6CC] grid grid-cols-2 gap-4 text-xs text-[#6F7268]">
            <div className="flex items-center gap-2"><span className="text-[#AD8A3E] font-bold">✓</span> Free delivery on orders &gt; ₹999</div>
            <div className="flex items-center gap-2"><span className="text-[#AD8A3E] font-bold">✓</span> 7-day easy returns</div>
          </div>

          {/* Admin Actions */}
          {isAuthenticated && (
            <div className="mt-6 pt-6 border-t border-[#D8D6CC] bg-[#FAF9F5] p-4 rounded-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6F7268] mb-3">Admin Actions</p>
              <div className="flex gap-3">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="px-4 py-1.5 rounded text-xs font-medium border border-[#1C2127] hover:bg-[#1C2127] hover:text-white transition"
                >
                  Edit Listing
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-1.5 rounded text-xs font-medium bg-[#B3435A] text-white hover:bg-[#8f3448] transition disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete Listing"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;