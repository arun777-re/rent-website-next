'use client'
import Image from "next/image";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import ListingCategory from "./Components/ListingCategory";
import FeaturedProperties from "./Components/FeaturedProperties";
import Footer from "./Components/Footer";
import HowItWorks from "./Components/HowItWorks";

export default function Home() {

  return (
   <div className="w-full bg-white">
    <Navbar headColor="gray-800" color="gray-800" hoverColor="first"/>
    <Banner/>
    <ListingCategory/>
    <HowItWorks/>
    <FeaturedProperties/>
    <Footer/>
   </div>
  );
}
