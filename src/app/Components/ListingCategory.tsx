import React from "react";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const ListingCategory = () => {
  const categories = [
    { name: "residentials", image: "/images/residential.jpg", list: "80" },
    { name: "plot", image: "/images/agriculture.jpg", list: "80" },
    { name: "industrial", image: "/images/industrial.jpg", list: "80" },
    { name: "commercial", image: "/images/commercial.jpg", list: "80" },
    { name: "investment", image: "/images/investment.jpg", list: "80" },
  ];

  return (
    <section className="max-w-screen w-full relative bg-white">
      <div className="w-full relative flex flex-col gap-10 py-16 lg:py-20 px-4 md:px-20 lg:px-30">
        {/* Heading */}
        <header className="space-y-4">
          <h3 className="">
            Listing Categories
          </h3>
          <p className="max-w-[30rem] leading-loose">
            A great platform to buy and sell your properties without any agent or
            commissions.
          </p>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
              <Link href={`/properties/${category.name}`} key={index}>
            <Card
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <figure>
                <Image
                  src={category.image}
                  alt={`${category.name} image`}
                  width={300}
                  height={150}
                  className="w-full h-[24vh] object-cover object-center"
                />
                <figcaption className="relative p-4 space-y-2">
                  <p
                    className="text-base font-semibold text-gray-800 hover:text-green-600"
                  >
                    {category.name.toUpperCase()}
                  </p>
                  <p className="text-xs mt-2">
                    {category.list} Listings
                  </p>
                </figcaption>
              </figure>
            </Card>
            </Link>

          ))}

        </div>
      </div>
    </section>
  );
};

export default ListingCategory;
