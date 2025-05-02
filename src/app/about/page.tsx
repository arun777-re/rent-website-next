import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import HowItWorks from "../Components/HowItWorks";
import Footer from "../Components/Footer";
import Testimonials from "../Components/Testimonials";
import Team from "../Components/Team";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <Banner heading="About Us" image={"/images/banner-contact.avif"} />
      <HowItWorks />
      <section
        className="max-w-screen-xl relative h-[40vh]
         bg-cover bg-center bg-no-repeat
         bg-fixed"
        style={{ backgroundImage: `url('/images/banner-main-1.jpg')` }}
      >
        <div className="absolute h-full w-full bg-black opacity-50"></div>
        <div
          className="w-full
            absolute z-10
             text-white
            top-1/2 left-1/2
             transform -translate-y-1/2
              -translate-x-1/2 max-w-2xl"
        >
          <div className="max-w-2xl w-full flex items-center justify-between">
            <article className="space-y-5 text-center">
              <h1 className="text-white">540+ </h1>
              <p className="text-white">Properties Sell</p>
            </article>
            <article className="space-y-5 text-center">
              <h1 className="text-white">20+ </h1>
              <p className="text-white">Award Gained</p>
            </article>
            <article className="space-y-5 text-center">
              <h1 className="text-white">9+ </h1>
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
