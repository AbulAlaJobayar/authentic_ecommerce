"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, ExternalLink } from "lucide-react";

const DEBOUNCE_MS = 200;

const productsData = [
  {
    id: 1,
    name: "Authentic Leather Wallet",
    image: "/images/products/wallet.jpg",
  },
  { id: 2, name: "Classic Men's Belt", image: "/images/products/wallet.jpg" },
  { id: 3, name: "Stylish Handbag", image: "/images/products/wallet.jpg" },
  { id: 4, name: "Brown Leather Shoes", image: "/images/products/wallet.jpg" },
  { id: 5, name: "Minimal Watch", image: "/images/products/wallet.jpg" },
  { id: 6, name: "Premium Backpack", image: "/images/products/wallet.jpg" },
  { id: 7, name: "Travel Duffel Bag", image: "/images/products/wallet.jpg" },
  { id: 8, name: "Office Laptop Bag", image: "/images/products/wallet.jpg" },
  { id: 9, name: "Leather Keychain", image: "/images/products/wallet.jpg" },
  { id: 10, name: "Card Holder", image: "/images/products/wallet.jpg" },
];

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce user input
  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = query.trim().toLowerCase();
      setDebouncedQuery(trimmed);
      setOpen(trimmed.length > 0); // open dropdown only when typing
    }, DEBOUNCE_MS);
    return () => clearTimeout(handler);
  }, [query]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return [];
    return productsData.filter((p) =>
      p.name.toLowerCase().includes(debouncedQuery)
    );
  }, [debouncedQuery]);

  // Click outside to close dropdown
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Truncate utility
  const truncate = (text: string, maxLen: number) =>
    text.length <= maxLen ? text : text.slice(0, maxLen - 3) + "...";

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-3 sm:px-0"
    >
      {/* Search Input */}
      <div className="relative flex items-center ">
        <Search className="absolute  left-3 w-5 h-5 text-gray-400 dark:text-slate-500" />
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 text-sm sm:text-base dark:bg-black dark:text-slate-200 border-2 border-black w-full py-2 sm:py-3"
        />
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2"
          >
            <Card className="bg-white dark:bg-slate-900 border border-border rounded-md shadow-xl overflow-hidden">
              {filteredProducts.length > 0 ? (
                <div className="max-h-64 sm:max-h-80 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between w-full px-4 py-2.5 sm:py-3 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={35}
                          height={35}
                          className="rounded object-cover w-8 h-8 sm:w-10 sm:h-10"
                        />
                        <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-slate-200 truncate">
                          {truncate(product.name, 60)}
                        </p>
                      </div>
                      <ExternalLink
                        size={16}
                        className="text-gray-500 dark:text-slate-400 hidden sm:block"
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-xs sm:text-sm py-4 text-gray-500 dark:text-slate-500">
                  No results found.
                </p>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchProduct;
