'use client'
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import ListingCategory from "./Components/ListingCategory";
import FeaturedProperties from "./Components/FeaturedProperties";
import Footer from "./Components/Footer";
import HowItWorks from "./Components/HowItWorks";
import Testimonials from "./Components/Testimonials";

export default function Home() {

  return (
   <div className="w-full bg-white mx-auto relative flex flex-col items-center inset-0">
    <Navbar headColor="gray-800" color="gray-800" hoverColor="first"/>
    <Banner/>
    <ListingCategory/>
    <HowItWorks/>
    <FeaturedProperties/>
    <Testimonials/>
    <Footer/>
   </div>
  );
}
