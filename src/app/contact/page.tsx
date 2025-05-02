import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import MapComponent from "../Components/MapComponent";
import Image from "next/image";
import Button from "../_component/Button";
import Footer from "../Components/Footer";
import HowItWorks from "../Components/HowItWorks";

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <Banner heading="Contact Us" image={"/images/banner-contact.avif"} />
      <section className="max-w-screen w-full relative">
          <div className="mx-w-lg w-full relative py-20 flex flex-row items-center justify-center gap-10">
            <Image
              src={"/images/contact.jpg"}
              width={450}
              height={600}
              alt="contact"
              className="object-center object-fill h-[70vh]"
            />
            <article className="h-auto shadow rounded">
              <form action="" method="post" className="p-6">
                <h4 className="text-2xl font-normal pb-6">Get in touch !</h4>
                <div className="flex flex-col items-start gap-4">
                  <div className="flex gap-4 items-center ">
                    <article className="flex flex-col gap-1">
                      <label htmlFor="" className="text-sm font-medium">
                        Your Name:
                      </label>
                      <input
                        type="text"
                        placeholder="Name:"
                        className="border-[1px] border-gray-300/60 rounded placeholder:text-sm placeholder:pl-4 py-2"
                      />
                    </article>
                    <article className="flex flex-col gap-1">
                      <label htmlFor="" className="text-sm font-medium">
                        Your Email:
                      </label>
                      <input
                        type="text"
                        placeholder="Email:"
                        className="border-[1px] border-gray-300/60 rounded placeholder:text-sm placeholder:pl-4 py-2"
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
                 border-gray-300/60 rounded placeholder:text-sm placeholder:pl-4 py-2"
                    />
                  </article>
                  <article className="flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium">
                      Your Comment:
                    </label>
                    <textarea
                      cols={52}
                      rows={4}
                      placeholder="Subject:"
                      className="border-[1px] border-gray-300/60 rounded placeholder:text-sm placeholder:pl-4 py-2"
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
        
      <HowItWorks/>
        <Footer/>
    </div>
  );
};

export default ContactUs;
