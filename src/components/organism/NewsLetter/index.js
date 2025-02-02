import React from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const NewsLetter = () => {
  return (
    <div className="w-[80%] md:w-[80%] h-[50vh] flex flex-col items-center justify-center mx-auto px-6 md:px-16 mb-10 bg-gradient-to-b from-[#fde1ff] to-[#e1ffea] gap-6 rounded-lg">
      <h1 className="text-[#454545] text-3xl md:text-4xl font-semibold text-center">Get Exclusive Offers on Your Email</h1>
      <p className="text-[#454545] text-md md:text-lg text-center">Subscribe to our newsletter and stay updated</p>
      <div className="flex flex-col md:flex-row items-center justify-between bg-white w-full max-w-2xl h-[70px] rounded-full border border-[#e3e3e3]">
        <Input type="email" placeholder="Enter your email" name="email" id="email" inputClassname="w-full md:w-[500px] h-full border-transparent text-[#616161] placeholder:text-[#616161] px-6 py-2" />
        <Button buttonClassname="w-full md:w-[210px] h-[60px] md:h-[70px] md:ml-4 rounded-full bg-black text-white text-lg font-semibold cursor-pointer">Subscribe</Button>
      </div>
    </div>
  );
};

export default NewsLetter;
