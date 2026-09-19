import { useEffect, useState } from "react";
import { Link } from "react-router";
// import { fetchProducts } from "../features/products/product.service"; 
// import { Product } from "../features/products/product.types";
import ScrollReveal from "../components/ScrollReveal";

export const BRAND = "Almanac";

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
    const [scrolled, setScrolled] = useState(false);

    // useEffect(() => {
    //     const loadFeatured = async () => {
    //         try {
    //             const data = await fetchProducts({ limit: 4, sort: "newest" });
    //             setFeatured(data.products);
    //         } catch {
    //             setFeatured([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     loadFeatured();
    // }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="bg-[#EFEEE8] text-[#1C2127] font-[Work_Sans] scroll-smooth">
            {/* ---------- HERO ---------- */}
            <section className="relative overflow-hidden">
                {/* Brand-colored gradient glow — premium depth without generic AI-purple */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#AD8A3E]/25 via-[#E2B15C]/10 to-transparent rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />

                <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="font-[Fraunces] text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl md:leading-[1.05] max-w-[14ch]">
                            Everyday things, <span className="text-[#AD8A3E]">chosen</span> with care
                        </h1>
                        <p className="mt-6 text-[#6F7268] max-w-[42ch] text-base md:text-lg">
                            Nine categories, one storefront. From desk gear to dinnerware —
                            each listing is picked, described, and photographed by the
                            same small team.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                            <Link
                                to="/products"
                                className="inline-block bg-[#1C2127] text-[#EFEEE8] px-6 py-3 text-sm hover:bg-[#AD8A3E] transition-all hover:shadow-[0_8px_24px_-8px_rgba(173,138,62,0.6)]"
                            >
                                Shop the collection
                            </Link>
                            <a
                                href="#categories"
                                className="text-sm underline decoration-[#D8D6CC] underline-offset-4 hover:decoration-[#AD8A3E]"
                            >
                                Browse categories
                            </a>
                        </div>

                        <div className="mt-14 flex gap-8 sm:gap-10">
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

                    {/* Product photo collage — the one deliberate load-in moment */}
                    <div className="relative hidden md:block h-[440px]" aria-hidden="true">
                        <img
                            src="https://picsum.photos/seed/hero-main/520/620"
                            alt=""
                            className="absolute right-0 top-0 w-72 h-96 object-cover shadow-[0_30px_60px_-20px_rgba(28,33,39,0.4)] motion-safe:animate-[settleIn_0.7s_ease-out]"
                        />
                        <img
                            src="https://picsum.photos/seed/hero-accent/420/420"
                            alt=""
                            className="absolute left-0 bottom-0 w-56 h-56 object-cover shadow-[0_30px_60px_-20px_rgba(28,33,39,0.4)] border-4 border-[#EFEEE8] motion-safe:animate-[settleIn_0.7s_ease-out_0.15s_both]"
                        />
                    </div>
                </div>
            </section>

            {/* ---------- CATEGORIES ---------- */}
            <section id="categories" className="border-t border-[#D8D6CC]">
                <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
                    <ScrollReveal>
                        <h2 className="font-[Fraunces] text-2xl md:text-3xl mb-8">Shop by category</h2>
                    </ScrollReveal>
                    <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-6 snap-x snap-mandatory md:snap-none">
                        {CATEGORIES.map((cat, i) => (
                            <ScrollReveal key={cat.name} delay={i * 60} className="flex-shrink-0 w-40 md:w-auto snap-start">
                                <Link
                                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                                    className="group relative block aspect-[3/4] overflow-hidden"
                                >
                                    <img
                                        src={`https://picsum.photos/seed/${cat.seed}/300/400`}
                                        alt={cat.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C2127]/80 via-[#1C2127]/10 to-transparent" />
                                    <span className="absolute bottom-3 left-3 text-[#EFEEE8] text-sm font-medium">
                                        {cat.name}
                                    </span>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- FEATURED PRODUCTS ---------- */}
            <section className="border-t border-[#D8D6CC]">
                <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
                    <ScrollReveal>
                        <div className="flex items-baseline justify-between mb-8">
                            <h2 className="font-[Fraunces] text-2xl md:text-3xl">Newly added</h2>
                            <Link
                                to="/products"
                                className="text-sm underline decoration-[#D8D6CC] underline-offset-4 hover:decoration-[#AD8A3E]"
                            >
                                View all products
                            </Link>
                        </div>
                    </ScrollReveal>

                    {/* {loading && <p className="text-sm text-[#6F7268]">Loading products...</p>} */}

                    {/* {!loading && featured.length === 0 && (
                        <p className="text-sm text-[#6F7268]">
                            No products yet — add some from the admin dashboard.
                        </p>
                    )} */}
{/* 
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
                        {featured.map((product, i) => (
                            <ScrollReveal key={product._id} delay={i * 80}>
                                <Link to={`/products/${product._id}`} className="group block">
                                    <div className="aspect-square overflow-hidden bg-[#E4E2D9]">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm">{product.name}</p>
                                    <p className="text-sm text-[#AD8A3E] font-medium">₹{product.price}</p>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div> */}
                </div>
            </section>

            {/* ---------- WHY SHOP HERE ---------- */}
            <section className="border-t border-[#D8D6CC] bg-[#E7E4DA]">
                <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid sm:grid-cols-3 gap-8 sm:gap-10">
                    {FEATURES.map((feature, i) => (
                        <ScrollReveal key={feature.title} delay={i * 100}>
                            <div className="border-l-2 border-[#AD8A3E] pl-5">
                                <h3 className="font-medium mb-2">{feature.title}</h3>
                                <p className="text-sm text-[#6F7268] leading-relaxed">{feature.body}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* ---------- CTA BAND ---------- */}
            <section className="relative bg-[#1C2127] text-[#EFEEE8] overflow-hidden">
                <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-[#AD8A3E]/20 rounded-full blur-[100px] pointer-events-none" />
                <ScrollReveal>
                    <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <h2 className="font-[Fraunces] text-2xl md:text-3xl max-w-[20ch]">
                            Everything you need, sorted into nine places
                        </h2>
                        <Link
                            to="/products"
                            className="inline-block self-start bg-[#AD8A3E] text-[#1C2127] px-6 py-3 text-sm font-medium hover:bg-[#EFEEE8] transition-colors"
                        >
                            Start browsing
                        </Link>
                    </div>
                </ScrollReveal>
            </section>

            {/* ---------- FOOTER ---------- */}
            <footer className="border-t border-[#D8D6CC]">
                <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[#6F7268]">
                    <span>{BRAND} — a small catalogue of everyday things</span>
                    <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
                </div>
            </footer>

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