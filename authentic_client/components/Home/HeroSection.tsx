/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "https://i.ibb.co.com/B5vNQZmW/Screen-Shot-Tool-20250713100047.png",
  },
  {
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
  {
    image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499",
  },
];

const autoplayPlugin = Autoplay({
  delay: 4000,
  stopOnInteraction: false,
});

const HeroSection = () => {
  const [api, setApi] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const discounts = async()=>{
  //   const res=await fetch(`${process.env.}`)
  // }
  // const userLogin = async (data: FieldValues) => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/login`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //         credentials: "include",
  //       },
  //     );
  
  //     // Handle non-OK responses
  //     if (!res.ok) {
  //       const errorResponse = await res.json();
  //       throw new Error(
  //         errorResponse.message || "Login failed. Please try again.",
  //       );
  //     }
  
  //     const userInfo = await res.json();
  
  //     // Ensure the response has the expected structure
  //     if (!userInfo.data) {
  //       throw new Error("Invalid response from the server.");
  //     }
  
  //     // Handle case where user is already logged in
  //     console.log("token from user file", userInfo.data.accessToken);
  //     // Store the access token and redirect
  //     if (userInfo.data.accessToken) {
  //       setAccessToken(userInfo.data.accessToken);
  //     }
  //     console.log("userinfo", userInfo);
  //     return userInfo;
  //   } catch (error) {
  //     console.error("Error during user login:", error);
  //     throw new Error(
  //       error instanceof Error ? error.message : "An unexpected error occurred.",
  //     );
  //   }
  // };
  const res=fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/login}`)
  const result=res.json()
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="py-6">
      <div className="max-w-350 mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
          {/* ================= LEFT CAROUSEL ================= */}
          <div className="relative group overflow-hidden rounded-2xl ">
            <Carousel
              plugins={[autoplayPlugin]}
              setApi={setApi}
              onMouseEnter={() => autoplayPlugin.stop()}
              onMouseLeave={() => autoplayPlugin.reset()}
            >
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-65 sm:h-87.5 lg:h-87.5 rounded">
                      <Image
                        src={slide.image}
                        alt="banner"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* ================= RECTANGLE ARROWS ================= */}
              <CarouselPrevious className="left-0 rounded opacity-0 group-hover:opacity-100 transition bg-white text-orange-500 hover:bg-orange-500 hover:text-white border-none  w-10 h-8 shadow-md" />

              <CarouselNext className="right-0 rounded opacity-0 group-hover:opacity-100 transition bg-white text-orange-500 hover:bg-orange-500 hover:text-white border-none  w-10 h-8 shadow-md" />
            </Carousel>

            {/* ================= DOTS (BOTTOM LEFT + COLOR ONLY) ================= */}
            <div className="absolute bottom-5 left-4 z-50 flex gap-2 px-2 rounded-full ">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    selectedIndex === index ? "bg-orange-500" : "bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ================= RIGHT BANNER ================= */}
          <div className="relative overflow-hidden rounded-2xl h-65 sm:h-87.5 lg:h-87.5 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716"
              alt="promo"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold">Fresh Organic Fruits</h3>
              <p className="text-sm mt-1 opacity-90">
                Natural & Healthy Products
              </p>

              <button className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
