"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type TCategory = {
  id: string;
  name: string;
  image: string;
};

const TopCategories = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/category`,
          {
            method: "GET",
            cache: "no-store",
          },
        );
        const data = await res.json();

        setCategories(data?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <p className="text-center font-normal text-2xl text-[#041F1E] mb-10 ">
        Featured Categories{" "}
      </p>

      {/* carosel */}

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
          }),
        ]}
        className="w-full "
      >
        <CarouselContent className="-ml-1  ">
          {categories?.map(({ image, name, id }, index) => (
            <CarouselItem
              key={index}
              className="basis-1/4  md:basis-1/6 lg:basis-[12.5%] mx-auto"
            >
              <Link
                href={`/product?categoryId=${id}`}
                className="p-1 flex items-center justify-center flex-col gap-3"
              >
                <Image src={image} alt={name} height={30} width={30} />
                <p>{name}</p>

                {/* <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{name}</span>
                  </CardContent>
                </Card> */}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="rounded-full  transition hover:bg-orange-500 bg-orange-500  text-white hover:text-white cursor-pointer border-none shadow-md" />
        <CarouselNext className="rounded-full  transition hover:bg-orange-500 bg-orange-500  text-white hover:text-white cursor-pointer border-none shadow-md" />
      </Carousel>
    </div>
  );
};

export default TopCategories;
