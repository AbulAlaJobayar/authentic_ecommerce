"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof Autoplay> | null>(null);
  if (!autoplayRef.current) {
    autoplayRef.current = Autoplay({ delay: 3000, stopOnInteraction: false });
  }

  return (
    <div className="w-full flex justify-center ">
      <Carousel
        plugins={[autoplayRef.current]}
        className="w-full my-8 relative"
        onMouseEnter={() => {
          autoplayRef.current?.stop();
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          autoplayRef.current?.reset();
          setIsHovered(false);
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex h-[150px] md:h-[200px] lg:h-[350px] items-center justify-center p-6">
                    <span className="text-4xl font-semibold">
                      <Image
                        src={
                          "https://i.ibb.co.com/B5vNQZmW/Screen-Shot-Tool-20250713100047.png"
                        }
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover "
                      />
                      {index + 1}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Animate navigation buttons only on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {/* Left (Previous) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="absolute left-5 md:left-16 top-1/2 -translate-y-1/2 z-20 "
              >
                <CarouselPrevious
                  className="bg-black/1 text-purple-50 hover:bg-white hover:text-black rounded-full p-2 
                border-white   transition-all "
                />
              </motion.div>

              {/* Right (Next) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="absolute right-5 md:right-20 top-1/2 -translate-y-1/2 z-20"
              >
                <CarouselNext
                  className="bg-black/1 text-purple-50 hover:bg-white hover:text-black rounded-full p-2 
                border-white   transition-all "
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Carousel>
    </div>
  );
};

export default HeroSection;
