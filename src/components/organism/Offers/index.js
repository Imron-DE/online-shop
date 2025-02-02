import Image from "next/image";
import React from "react";
import Button from "@/components/atoms/Button";

const Offers = () => {
  return (
    <div className="w-[80%] h-[85vh] flex mx-auto px-28 mb-10 bg-gradient-to-b from-[#fde1ff] to-[#e1dde2] rounded-lg shadow-lg">
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <h1 className="text-[#171717] text-[70px] font-bold leading-tight">Exclusive</h1>
        <h1 className="text-[#171717] text-[70px] font-bold leading-tight">Offers For You</h1>
        <p className="text-[#171717] text-xl font-medium">ONLY ON BEST SELLERS PRODUCT</p>
        <Button buttonClassname="w-64 h-16 rounded-full bg-black text-white text-xl font-semibold mt-6 hover:bg-gray-800 transition-all duration-300 shadow-md">Check Now</Button>
      </div>
      <div className="flex-1 flex items-center justify-center pt-6">
        <Image src="/assets/exclusive_image.png" alt="offer" width={450} height={450} className="rounded-lg" />
      </div>
    </div>
  );
};

export default Offers;
