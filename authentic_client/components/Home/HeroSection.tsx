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
import { Discount } from "@/services/action/discount/discount";
import Link from "next/link";

interface DiscountBanner {
  id: string;
  title?: string;
  image: string;
  discount?: number;
}
const autoplayPlugin = Autoplay({
  delay: 4000,
  stopOnInteraction: false,
});

const HeroSection = () => {
  const [api, setApi] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slides, setSlides] = useState<DiscountBanner[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch Discounts
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const result = await Discount.getAllDiscount();

        // Adjust this based on your API response
        setSlides(result?.data || []);
      } catch (error) {
        console.error("Failed to fetch discounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

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
  if (loading) {
    return (
      <section className="py-6">
        <div className="max-w-350 mx-auto">
          <div className="h-87.5 rounded-2xl bg-gray-100 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="max-w-350 mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
          {/* ================= LEFT CAROUSEL ================= */}
          <div className="relative group overflow-hidden rounded-sm ">
            <Carousel
              plugins={[autoplayPlugin]}
              setApi={setApi}
              onMouseEnter={() => autoplayPlugin.stop()}
              onMouseLeave={() => autoplayPlugin.reset()}
            >
              <CarouselContent>
                {slides.map((slide, index) => {
                  console.log(slide.image, "hey image");
                  return (
                    <CarouselItem key={index}>
                      <div className="relative h-50  sm:h-62.5  md:h-75  lg:h-87.5 rounded">
                        <Link href={`products/?discountId=${slide.id}`}>
                          <Image
                            src={slide.image}
                            alt={`Slide ${index}`}
                            fill
                            priority
                            className="object-cover"
                          />
                        </Link>
                      </div>
                    </CarouselItem>
                  );
                })}
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
          <div className="relative overflow-hidden hidden lg:block rounded-sm h-65 none lg:h-87.5 shadow-lg">
            <Link href={`products/?discountId=${slides[0].id}`}>
              <Image
                src={slides[0].image}
                alt="promo"
                fill
                className="object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
