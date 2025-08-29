import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Recycle, ShoppingBag, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

const Feature = ({ Icon, title, desc }) => (
  <div className="p-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-lg bg-blue-600/10 text-blue-700 dark:text-blue-300">
        <Icon size={20} />
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs text-gray-500 mt-1">{label}</div>
  </div>
);

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 via-emerald-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-600/10 text-blue-700 dark:text-blue-300 mb-4">
                <Leaf size={14} /> Eco-friendly marketplace
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Shop smarter. <span className="text-blue-600">Live greener.</span>
              </h1>
              <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-prose">
                CleanHub curates sustainable products with transparent impact.
                Reduce waste, support ethical brands, and track your footprint—all in one place.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/user/products"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Start shopping <ArrowRight size={18} />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Create account
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                <Stat label="Waste diverted" value="12.4t" />
                <Stat label="CO₂ saved" value="8.9t" />
                <Stat label="Brands onboard" value="56+" />
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="relative">
                <div className="absolute inset-0 -rotate-6 rounded-3xl bg-emerald-500/20 blur-lg" />
                <div className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-4 shadow-xl w-full max-w-md mx-auto">
                  <div className="grid grid-cols-3 gap-3">
                    {["Bamboo Brush","Steel Bottle","Organic Soap","Canvas Tote","Beeswax Wrap","Wood Comb"].map((name, i) => (
                      <div key={i} className="aspect-square rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-xs text-center p-2">
                        {name}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                      <Recycle size={16} />
                      <span>Recycled & reusable</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <ShieldCheck size={16} />
                      <span>Verified impact</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-center text-gray-500">
                Visuals for illustration • Browse real items in the catalog
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Why CleanHub?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Feature Icon={Leaf} title="Sustainable by default" desc="We partner with brands that meet strict eco-criteria—materials, packaging, and lifecycle." />
          <Feature Icon={Recycle} title="Circular choices" desc="Discover refillables, recycled materials, and products designed for reuse." />
          <Feature Icon={ShoppingBag} title="Curated catalog" desc="Handpicked essentials for home, self-care, and travel—quality over quantity." />
          <Feature Icon={ShieldCheck} title="Trust & transparency" desc="Clear sourcing, verified impact data, and authentic reviews." />
        </div>
      </section>

  
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Shop by category</h2>
          <Link to="/user/products" className="text-sm inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Home & Kitchen"},
            { name: "Self-care", },
            { name: "On-the-go", },
            { name: "Kids & Baby",},
          ].map((c) => (
            <Link key={c.name} to="/user/products" className="group p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 hover:shadow-md transition">
              <div className="text-3xl">{c.emoji}</div>
              <div className="mt-3 font-semibold">{c.name}</div>
              <div className="text-xs text-gray-500 mt-1 group-hover:underline">Browse</div>
            </Link>
          ))}
        </div>
      </section>

      
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/60 dark:bg-gray-900/60">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-yellow-500" />
          <h2 className="text-lg md:text-xl font-semibold">What our community says</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          {[
            { name: "Aanya", text: "Finally a place where eco options are actually good quality." },
            { name: "Rahul", text: "Love the refillables—cut my plastic waste a lot." },
            { name: "Meera", text: "Clear impact data made me switch my daily essentials." },
          ].map((t, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="font-semibold">{t.name}</div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="text-center">
        <h2 className="text-2xl font-bold">Ready to make greener choices?</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Create an account to save favorites, track orders, and see your impact.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Link to="/signup" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Sign up free
          </Link>
          <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}