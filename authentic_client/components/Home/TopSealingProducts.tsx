/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getTopProducts } from "@/services/action/products";

const TopSealingProducts = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const product = await getTopProducts();
        setProducts(product?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="bg-amber-50/70 ">
      <p className="text-center font-semibold text-3xl text-[#041F1E] my-6">
        Top Selling Products
      </p>
      <div className="grid grid-cols-2  md:grid-cols-1 lg:grid-cols-2 gap-6">
        {products?.map((item: any) => {
          const product = item.product;
          // console.log(product.sellingPrice)
          const discount = (
            (Number(product?.sellingPrice) *
              Number(product?.discount?.percentage)) /
            100
          ).toFixed();
          console.log(product);
          const image = product?.image[0] || "/placeholder.png";
          return (
            <div
              key={product?.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="w-full md:w-2/5 flex justify-center items-center p-4">
                  <Image
                    src={image}
                    alt={product.name}
                    width={250}
                    height={250}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-3/5 p-5 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-[#041F1E] whitespace-nowrap">
                    {product?.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-2xl font-bold text-orange-500">
                      ৳{Number(product?.sellingPrice) - Number(discount)}
                    </span>

                    <span className="text-lg text-gray-400 line-through">
                      ৳{Number(product?.sellingPrice)}
                    </span>
                  </div>

                  {/* Save */}
                  <div className="mt-2">
                    <span className="bg-lime-300 text-black text-sm px-3 py-1 rounded-full">
                      Save ৳
                      {product?.sellingPrice -
                        (Number(product?.sellingPrice) - Number(discount))}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-50"
                    >
                      <IoCartOutline />
                      Add To Cart
                    </Button>

                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <IoCartOutline />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopSealingProducts;
