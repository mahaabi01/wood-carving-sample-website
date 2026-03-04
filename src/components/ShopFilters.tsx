"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Grid3X3,
  LayoutGrid,
  Search,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  category: string;
  material: string;
}

interface ShopContentProps {
  categories: string[];
  products: Product[];
}

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export default function ShopContent({
  categories,
  products,
}: ShopContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    material: true,
  });

  // Derive unique materials from products
  const allMaterials = useMemo(
    () => [...new Set(products.map((p) => p.material))].sort(),
    [products],
  );

  // Derive price bounds
  const minPrice = useMemo(
    () => Math.min(...products.map((p) => p.price)),
    [products],
  );
  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => p.price)),
    [products],
  );

  // Filter & sort
  const filtered = useMemo(() => {
    let result = [...products];

    // Category
    if (activeCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    // Price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Material
    if (selectedMaterials.length > 0) {
      result = result.filter((p) => selectedMaterials.includes(p.material));
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [
    products,
    activeCategory,
    priceRange,
    selectedMaterials,
    sortBy,
    searchQuery,
  ]);

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat],
    );
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    setActiveCategory("All");
    setPriceRange([0, 100000]);
    setSelectedMaterials([]);
    setSearchQuery("");
    setSortBy("default");
  };

  const activeFilterCount =
    (activeCategory !== "All" ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0) +
    selectedMaterials.length +
    (searchQuery.trim() ? 1 : 0);

  // Sidebar filter panel (shared between mobile and desktop)
  const filterPanel = (
    <div className="space-y-6">
      {/* Search within results */}
      <div>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-wood-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none text-sm bg-white"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-wood-100 pb-5">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-sm font-semibold text-wood-800 mb-3"
        >
          Categories
          {expandedSections.category ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {expandedSections.category && (
          <div className="space-y-1.5">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? products.length
                  : products.filter(
                      (p) => p.category.toLowerCase() === cat.toLowerCase(),
                    ).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-wood-900 text-white font-medium"
                      : "text-wood-600 hover:bg-wood-50 hover:text-wood-800"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-xs ${
                      activeCategory === cat ? "text-white/70" : "text-wood-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-wood-100 pb-5">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-sm font-semibold text-wood-800 mb-3"
        >
          Price Range (NPR)
          {expandedSections.price ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            {/* Min/Max inputs */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-[10px] text-wood-400 uppercase tracking-wider mb-1 block">
                  Min
                </label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  min={0}
                  className="w-full px-3 py-2 rounded-lg border border-wood-200 text-sm focus:border-gold-500 outline-none"
                  placeholder="₨ 0"
                />
              </div>
              <span className="text-wood-300 mt-5">–</span>
              <div className="flex-1">
                <label className="text-[10px] text-wood-400 uppercase tracking-wider mb-1 block">
                  Max
                </label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  min={0}
                  className="w-full px-3 py-2 rounded-lg border border-wood-200 text-sm focus:border-gold-500 outline-none"
                  placeholder="₨ 100,000"
                />
              </div>
            </div>

            {/* Range slider */}
            <div className="px-1">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full accent-wood-800 h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-wood-400 mt-1">
                <span>₨ {minPrice.toLocaleString()}</span>
                <span>₨ {maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Quick price ranges */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Under ₨2K", range: [0, 2000] as [number, number] },
                { label: "₨2K–₨5K", range: [2000, 5000] as [number, number] },
                { label: "₨5K–₨10K", range: [5000, 10000] as [number, number] },
                { label: "₨10K+", range: [10000, 100000] as [number, number] },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setPriceRange(preset.range)}
                  className={`text-xs py-1.5 px-2 rounded-md border transition-all ${
                    priceRange[0] === preset.range[0] &&
                    priceRange[1] === preset.range[1]
                      ? "border-wood-800 bg-wood-800 text-white"
                      : "border-wood-200 text-wood-500 hover:border-wood-400"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Material Filter */}
      <div className="pb-2">
        <button
          onClick={() => toggleSection("material")}
          className="flex items-center justify-between w-full text-sm font-semibold text-wood-800 mb-3"
        >
          Material
          {expandedSections.material ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {expandedSections.material && (
          <div className="space-y-2">
            {allMaterials.map((mat) => {
              const count = products.filter((p) => p.material === mat).length;
              return (
                <label
                  key={mat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(mat)}
                    onChange={() => toggleMaterial(mat)}
                    className="w-4 h-4 rounded border-wood-300 text-wood-800 focus:ring-wood-500 accent-wood-800 cursor-pointer"
                  />
                  <span className="text-sm text-wood-600 group-hover:text-wood-800 flex-1">
                    {mat}
                  </span>
                  <span className="text-xs text-wood-400">{count}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Clear all */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full py-2.5 text-sm text-temple-500 hover:text-temple-600 border border-temple-200 rounded-lg hover:bg-temple-50 transition-colors font-medium"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="flex gap-8">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[260px] flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-xl border border-wood-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-wood-900 uppercase tracking-wider mb-5 flex items-center gap-2">
            <SlidersHorizontal size={16} /> Filters
          </h3>
          {filterPanel}
        </div>
      </aside>

      {/* Mobile filter button */}
      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 bg-wood-900 text-white rounded-full shadow-xl text-sm font-medium"
      >
        <SlidersHorizontal size={16} />
        Filters
        {activeFilterCount > 0 && (
          <span className="w-5 h-5 bg-temple-500 rounded-full text-xs flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[300px] bg-white z-50 lg:hidden overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-wood-100 px-5 py-4 flex items-center justify-between z-10">
              <h3 className="font-bold text-wood-900 flex items-center gap-2">
                <SlidersHorizontal size={16} /> Filters
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 text-wood-400 hover:text-wood-800 hover:bg-wood-50 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5">{filterPanel}</div>
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar: results count + sort + grid toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="text-sm text-wood-500">
            Showing{" "}
            <span className="font-semibold text-wood-800">
              {filtered.length}
            </span>{" "}
            of {products.length} products
            {activeCategory !== "All" && (
              <span className="ml-1">
                in{" "}
                <span className="font-medium text-wood-700">
                  {activeCategory}
                </span>
              </span>
            )}
          </p>

          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm border border-wood-200 rounded-lg px-3 py-2 bg-white text-wood-700 focus:border-gold-500 outline-none cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>

            {/* Grid toggle (desktop only) */}
            <div className="hidden lg:flex items-center border border-wood-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors ${
                  gridCols === 3
                    ? "bg-wood-900 text-white"
                    : "text-wood-400 hover:text-wood-700"
                }`}
                title="3 columns"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 transition-colors ${
                  gridCols === 4
                    ? "bg-wood-900 text-white"
                    : "text-wood-400 hover:text-wood-700"
                }`}
                title="4 columns"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter tags */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-wood-400 uppercase tracking-wider">
              Active:
            </span>
            {activeCategory !== "All" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-wood-100 text-wood-700 text-xs rounded-full">
                {activeCategory}
                <button
                  onClick={() => setActiveCategory("All")}
                  className="hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 100000) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-wood-100 text-wood-700 text-xs rounded-full">
                ₨{priceRange[0].toLocaleString()} – ₨
                {priceRange[1].toLocaleString()}
                <button
                  onClick={() => setPriceRange([0, 100000])}
                  className="hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedMaterials.map((mat) => (
              <span
                key={mat}
                className="inline-flex items-center gap-1 px-3 py-1 bg-wood-100 text-wood-700 text-xs rounded-full"
              >
                {mat}
                <button
                  onClick={() => toggleMaterial(mat)}
                  className="hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-wood-100 text-wood-700 text-xs rounded-full">
                &ldquo;{searchQuery}&rdquo;
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div
            className={`grid gap-5 sm:grid-cols-2 ${
              gridCols === 3
                ? "lg:grid-cols-3"
                : "lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-wood-100">
            <div className="text-wood-300 text-5xl mb-4">🪵</div>
            <p className="text-wood-500 text-lg font-medium">
              No products match your filters
            </p>
            <p className="text-wood-400 text-sm mt-1">
              Try adjusting your price range or clearing some filters
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-5 px-6 py-2.5 bg-wood-900 text-white text-sm rounded-lg hover:bg-wood-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
