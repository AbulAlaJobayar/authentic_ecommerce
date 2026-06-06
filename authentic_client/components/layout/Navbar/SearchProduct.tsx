"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi2";
const DEBOUNCE_MS = 300;

type Product = {
  id: number;
  name: string;
  image: string[];
  sellingPrice: number;
};

const SearchProduct = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [, setDebouncedQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  //  Debounce

  // API CALL (Express backend)
  const fetchProducts = async (searchTerm: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/product?searchTerm=${searchTerm}`
      );

      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = query.trim();

      setDebouncedQuery(trimmed);

      if (trimmed.length >= 2) {
        fetchProducts(trimmed);
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(handler);
  }, [query]);


  //  Click outside
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  //  Submit (Enter or button click)
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!query.trim()) return;

    router.push(`/products?searchTerm=${query.trim()}`);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto"
    >
      {/* FORM */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex items-center"
      >
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="py-5 pr-10 w-full bg-gray-100 dark:bg-black"
        />

        {/* SEARCH BUTTON (ONCLICK + SUBMIT SUPPORT) */}
        <button
          type="submit"
          onClick={() => handleSearchSubmit()}
          className="absolute right-3 cursor-pointer"
        >
          <Search className="w-5 h-5 text-gray-500" />
        </button>
      </form>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-50 w-full mt-4"
          >
            <Card className=" border bg-white dark:bg-slate-900 py-0 ">
              {products?.length > 0 ? (
                <div className="max-h-80 overflow-y-auto ">
                  {products?.map((product) => (
                    <Link
                      key={product?.id}
                      href={`/products/${product.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 border-b border-gray-200"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <Image
                          src={product?.image?.map((img: string) => img)[0]}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                        <div>
                          <p className="text-md font-normal">
                            {product.name}
                          </p>
                          <p className="text-sm font-normal text-[#F48721] flex gap-1  items-center">
                            <HiOutlineCurrencyBangladeshi /> {product.sellingPrice && product.sellingPrice.toFixed(2)}
                          </p>
                        </div>

                      </div>


                    </Link>
                  ))}
                </div>
              ) : (
                <p className="p-4 text-center text-sm text-gray-500">
                  No results found
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