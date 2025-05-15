import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import HowItWorks from "../Components/HowItWorks";
import Footer from "../Components/Footer";
import Testimonials from "../Components/Testimonials";
import Team from "../Components/Team";

const AboutUs = () => {
  return (
    <div className="max-w-screen w-full h-auto relative mx-auto overflow-x-hidden hide-scrollbar">
      <Navbar />
      <Banner heading="About Us" image={"/images/banner-contact.avif"} />
      <HowItWorks paddingtop={true} />
      <section
        className="relative w-full h-[40vh] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url('/images/banner-main-1.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <div className="relative z-10 w-full h-full flex items-center justify-center text-white text-center">
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row space-x-0 px sm:space-x-60 ">
            <article className="space-y-3 sm:space-y-8">
              <h1 className="text-3xl font-bold text-white">540+</h1>
              <p className="text-white">Properties Sold</p>
            </article>
            <article className="space-y-4 sm:space-y-8">
              <h1 className="text-3xl font-bold text-white">20+</h1>
              <p className="text-white">Awards Gained</p>
            </article>
            <article className="space-y-4 sm:space-y-8">
              <h1 className="text-3xl font-bold text-white">9+</h1>
              <p className="text-white">Years Experience</p>
            </article>
          </div>
        </div>
      </section>
      <Team />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default AboutUs;
