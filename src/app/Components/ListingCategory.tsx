import React from "react";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const ListingCategory = () => {
  const categories = [
    { name: "residentials", image: "/images/residential.jpg", list: "80" },
    { name: "land", image: "/images/agriculture.jpg", list: "80" },
    { name: "industrial", image: "/images/industrial.jpg", list: "80" },
    { name: "commercial", image: "/images/commercial.jpg", list: "80" },
    { name: "investment", image: "/images/investment.jpg", list: "80" },
  ];

  return (
    <section className="w-full  px-30 py-16 bg-white">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-10">
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
                  className="w-full h-[20vh] object-cover object-center"
                />
                <figcaption className="relative p-4 space-y-4">
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
