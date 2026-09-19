import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api/axios";
// import { Product } from "../features/products/product.types";

const BRAND = "Almanac";

const CATEGORIES = [
    { name: "Electronics", seed: "cat-electronics" },
    { name: "Fashion", seed: "cat-fashion" },
    { name: "Home & Kitchen", seed: "cat-home" },
    { name: "Beauty", seed: "cat-beauty" },
    { name: "Sports & Fitness", seed: "cat-sports" },
    { name: "Furniture", seed: "cat-furniture" },
];

const FEATURES = [
    {
        title: "Checked before it ships",
        body: "Every item is inspected against its listing photos before it leaves the warehouse.",
    },
    {
        title: "Free shipping over ₹999",
        body: "No membership, no fine print — the threshold applies to every order, every category.",
    },
    {
        title: "7-day easy returns",
        body: "Change your mind within a week of delivery and we'll collect it at no cost to you.",
    },
];

const Home = () => {
    // const [featured, setFeatured] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const loadFeatured = async () => {
        //     try {
        //         const data = await api.get("/products");
        //         setFeatured(data.data);
        //     } catch {
        //         setFeatured([]);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // loadFeatured();
    }, []);

    return (
        <div className="bg-[#EFEEE8] text-[#1C2127] font-[Work_Sans]">
            <header className="border-b border-[#D8D6CC]">
                <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
                    <span className="font-[Fraunces] text-xl">{BRAND}</span>
                    <div className="hidden md:flex items-center gap-8 text-sm text-[#1C2127]">
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
                        className="text-sm border border-[#1C2127] px-4 py-2 hover:bg-[#1C2127] hover:text-[#EFEEE8] transition-colors"
                    >
                        Shop now
                    </Link>
                </nav>
            </header>

            {/* ---------- HERO ---------- */}
            <section className="max-w-6xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 className="font-[Fraunces] text-[2.75rem] leading-[1.08] md:text-6xl md:leading-[1.05] max-w-[14ch]">
                        Everyday things, chosen with care
                    </h1>
                    <p className="mt-6 text-[#6F7268] max-w-[42ch] text-base md:text-lg">
                        Nine categories, one storefront. From desk gear to dinnerware —
                        each listing is picked, described, and photographed by the same
                        small team.
                    </p>

                    <div className="mt-8 flex items-center gap-6">
                        <Link
                            to="/products"
                            className="inline-block bg-[#1C2127] text-[#EFEEE8] px-6 py-3 text-sm hover:bg-[#AD8A3E] transition-colors"
                        >
                            Shop the collection
                        </Link>
                        <a href="#categories" className="text-sm underline decoration-[#D8D6CC] underline-offset-4 hover:decoration-[#AD8A3E]">
                            Browse categories
                        </a>
                    </div>

                    <div className="mt-14 flex gap-10">
                        <div>
                            <p className="font-[Fraunces] text-2xl">54+</p>
                            <p className="text-sm text-[#6F7268]">products listed</p>
                        </div>
                        <div>
                            <p className="font-[Fraunces] text-2xl">9</p>
                            <p className="text-sm text-[#6F7268]">categories</p>
                        </div>
                        <div>
                            <p className="font-[Fraunces] text-2xl">₹999</p>
                            <p className="text-sm text-[#6F7268]">free shipping over</p>
                        </div>
                    </div>
                </div>

                {/* Product photo collage — the one deliberate motion moment on the page */}
                <div className="relative hidden md:block h-[420px]" aria-hidden="true">
                    <img
                        src="https://picsum.photos/seed/hero-main/520/620"
                        alt=""
                        className="absolute right-0 top-0 w-72 h-96 object-cover shadow-[0_20px_40px_-15px_rgba(28,33,39,0.35)] motion-safe:animate-[settleIn_0.7s_ease-out]"
                    />
                    <img
                        src="https://picsum.photos/seed/hero-accent/420/420"
                        alt=""
                        className="absolute left-0 bottom-0 w-56 h-56 object-cover shadow-[0_20px_40px_-15px_rgba(28,33,39,0.35)] motion-safe:animate-[settleIn_0.7s_ease-out_0.15s_both]"
                    />
                </div>
            </section>

            {/* ---------- CATEGORIES ---------- */}
            <section id="categories" className="border-t border-[#D8D6CC]">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="font-[Fraunces] text-2xl md:text-3xl mb-8">Shop by category</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-6">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat.name}
                                to={`/products?category=${encodeURIComponent(cat.name)}`}
                                className="group relative flex-shrink-0 w-40 md:w-auto aspect-[3/4] overflow-hidden"
                            >
                                <img
                                    src={`https://picsum.photos/seed/${cat.seed}/300/400`}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2127]/70 via-transparent to-transparent" />
                                <span className="absolute bottom-3 left-3 text-[#EFEEE8] text-sm font-medium">
                                    {cat.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- FEATURED PRODUCTS ---------- */}
            <section className="border-t border-[#D8D6CC]">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="flex items-baseline justify-between mb-8">
                        <h2 className="font-[Fraunces] text-2xl md:text-3xl">Newly added</h2>
                        <Link to="/products" className="text-sm underline decoration-[#D8D6CC] underline-offset-4 hover:decoration-[#AD8A3E]">
                            View all products
                        </Link>
                    </div>

                    {loading && <p className="text-sm text-[#6F7268]">Loading products...</p>}

                    {!loading && featured.length === 0 && (
                        <p className="text-sm text-[#6F7268]">
                            No products yet — add some from the admin dashboard.
                        </p>
                    )}

                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {featured.map((product) => (
                            <Link key={product._id} to={`/products/${product._id}`} className="group">
                                <div className="aspect-square overflow-hidden bg-[#E4E2D9]">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>
                                <p className="mt-3 text-sm">{product.name}</p>
                                <p className="text-sm text-[#AD8A3E]">₹{product.price}</p>
                            </Link>
                        ))}
                    </div> */}
                </div>
            </section>

            {/* ---------- WHY SHOP HERE ---------- */}
            <section className="border-t border-[#D8D6CC]">
                <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="border-l border-[#AD8A3E] pl-5">
                            <h3 className="font-medium mb-2">{feature.title}</h3>
                            <p className="text-sm text-[#6F7268] leading-relaxed">{feature.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- CTA BAND ---------- */}
            <section className="bg-[#1C2127] text-[#EFEEE8]">
                <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <h2 className="font-[Fraunces] text-2xl md:text-3xl max-w-[20ch]">
                        Everything you need, sorted into nine places
                    </h2>
                    <Link
                        to="/products"
                        className="inline-block self-start bg-[#AD8A3E] text-[#1C2127] px-6 py-3 text-sm hover:bg-[#EFEEE8] transition-colors"
                    >
                        Start browsing
                    </Link>
                </div>
            </section>

            {/* ---------- FOOTER ---------- */}
            <footer className="border-t border-[#D8D6CC]">
                <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[#6F7268]">
                    <span>{BRAND} — a small catalogue of everyday things</span>
                    <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
                </div>
            </footer>

            {/* Single orchestrated hero entrance — respects reduced-motion via motion-safe: above */}
            <style>{`
        @keyframes settleIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default Home;