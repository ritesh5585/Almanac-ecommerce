import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { createProduct, updateProduct, getProductById } from "../product.service";
import type { ProductFormData } from "../product.types";

const CATEGORIES = ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports & Fitness", "Furniture", "Accessories"];

const EMPTY: ProductFormData = { name: "", description: "", price: 0, stock: 0, category: "Electronics", imageUrl: "" };

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductFormData>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getProductById(id)
      .then((p) => {
        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category,
          imageUrl: p.imageUrl || p.images?.[0] || "",
        });
      })
      .catch(() => setError("Failed to load product details"))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (field: keyof ProductFormData, val: string | number) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (isEdit && id) {
        await updateProduct(id, form);
      } else {
        await createProduct(form);
      }
      navigate("/admin/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-[#6F7268]">
        <div className="w-5 h-5 border-2 border-[#AD8A3E] border-t-transparent rounded-full animate-spin mr-3" />
        Loading product form...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/admin/products" className="text-xs text-[#6F7268] hover:text-[#AD8A3E] flex items-center gap-1 mb-4">
        ← Back to Manage Products
      </Link>

      <div className="bg-white border border-[#D8D6CC] rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="font-[Fraunces] text-2xl mb-1">{isEdit ? "Edit Product" : "Create New Product"}</h1>
        <p className="text-xs text-[#6F7268] mb-6">Fill in the product details to publish to your catalogue.</p>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-[#B3435A]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1">Product Title</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Wireless Noise-Cancelling Headphones"
              required
              className="w-full border border-[#D8D6CC] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#AD8A3E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full border border-[#D8D6CC] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#AD8A3E]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                min="0"
                value={form.price || ""}
                onChange={(e) => update("price", Number(e.target.value))}
                placeholder="2999"
                required
                className="w-full border border-[#D8D6CC] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#AD8A3E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Stock Quantity</label>
              <input
                type="number"
                min="0"
                value={form.stock || ""}
                onChange={(e) => update("stock", Number(e.target.value))}
                placeholder="25"
                required
                className="w-full border border-[#D8D6CC] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#AD8A3E]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Image URL</label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full border border-[#D8D6CC] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#AD8A3E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe craftsmanship, materials, dimensions, and specifications..."
              required
              className="w-full border border-[#D8D6CC] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#AD8A3E]"
            />
          </div>

          {/* Quick Preview Thumbnail */}
          {form.imageUrl && (
            <div className="flex items-center gap-3 pt-2">
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-16 h-16 rounded-lg object-cover border border-[#D8D6CC]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span className="text-xs text-[#6F7268]">Image preview confirmed</span>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#1C2127] text-[#EFEEE8] py-2.5 rounded-lg text-sm font-medium hover:bg-[#AD8A3E] transition-colors disabled:opacity-50"
            >
              {submitting ? "Saving..." : isEdit ? "Update Product" : "Publish Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-5 py-2.5 rounded-lg border border-[#D8D6CC] text-sm text-[#6F7268] hover:bg-[#FAF9F5] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;