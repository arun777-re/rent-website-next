import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import MapComponent from "../Components/MapComponent";
import Image from "next/image";
import Button from "../_component/Button";
import Footer from "../Components/Footer";
import HowItWorks1 from "../Components/HowItWorks1";

const ContactUs = () => {
  return (
    <div className='max-w-screen w-full relative h-auto mx-auto overflow-x-hidden hide-scrollbar'>
      <Navbar />
      <Banner heading="Contact Us" image={"/images/banner-contact.avif"}/>
      <section className="max-w-screen w-full relative">
          <div className=" w-full relative px-4 pb-16 md:py-20 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
            <Image
              src={"/images/contact.jpg"}
              width={600}
              height={600}
              alt="contact"
              className="object-center object-cover h-[50vh] lg:h-[70vh]"
            />
            <article className="h-auto w-full md:w-auto shadow rounded px-4">
              <form action="" method="post" className="px-0 py-2 md:p-6">
                <h4 className="text-2xl font-normal pb-6">Get in touch !</h4>
                <div className="w-full flex flex-col items-start gap-4">
                  <div className="w-full flex flex-col md:flex-row gap-4 items-center ">
                    <article className="w-full flex flex-col gap-1">
                      <label htmlFor="" className="text-sm font-medium">
                        Your Name:
                      </label>
                      <input
                        type="text"
                        placeholder="Name:"
                        className="border-[1px] w-full border-gray-300/60 rounded placeholder:text-sm  py-2 px-4"
                      />
                    </article>
                    <article className="w-full flex flex-col gap-1">
                      <label htmlFor="" className="text-sm font-medium">
                        Your Email:
                      </label>
                      <input
                        type="text"
                        placeholder="Email:"
                        className="border-[1px] border-gray-300/60 rounded placeholder:text-sm px-4 py-2"
                      />
                    </article>
                  </div>
                  <article className="flex flex-col gap-1 w-full">
                    <label htmlFor="" className="text-sm font-medium">
                      Your Question:
                    </label>
                    <input
                      type="text"
                      placeholder="Subject:"
                      className="border-[1px]
                 border-gray-300/60 rounded placeholder:text-sm px-4 py-2"
                    />
                  </article>
                  <article className="w-full flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium">
                      Your Comment:
                    </label>
                    <textarea
                      cols={52}
                      rows={4}
                      placeholder="Subject:"
                      className="border-[1px] border-gray-300/60 rounded placeholder:text-sm px-4 py-2"
                    />
                  </article>
                  <Button
                    type="submit"
                    className="bg-first rounded-md py-2 px-4 cursor-pointer text-white"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </article>
          </div>
        </section>
        
        <MapComponent />
        
      <HowItWorks1/>
        <Footer/>
    </div>
  );
};

export default ContactUs;
