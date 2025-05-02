import React from "react";
import { Card } from "@radix-ui/themes";
import { FaStar } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";

type ImageProps = string | StaticImageData;

interface testimProps {
  description: string;
  image: ImageProps;
  name: string;
  designation: string;
}

const TestimCard: React.FC<testimProps> = ({
  description,
  image,
  name,
  designation,
}) => {



  return (
    <Card className="relative w-full h-auto flex flex-col items-center">
      <h4 className="font-serif text-gray-700/60 text-center">{description}</h4>
      <figure className="flex flex-col items-center justify-center mt-5">
        <div className="flex gap-2 items-center pb-4">
          <FaStar size={18} className="text-yellow-400" />
          <FaStar size={18} className="text-yellow-400" />
          <FaStar size={18} className="text-yellow-400" />
          <FaStar size={18} className="text-yellow-400" />
          <FaStar size={18} className="text-yellow-400" />
        </div>
        <Image
          src={image}
          alt="testim-image"
          height={30}
          width={80}
          className="rounded-[50%] h-16 w-16"
        />
        <figcaption className="relative text-center pt-2">
          <p className="text-gray-800 tracking-loose font-medium">{name}</p>
          <p className="pt-1 ">{designation}</p>
        </figcaption>
      </figure>
    </Card>
  );
};

export default TestimCard;
