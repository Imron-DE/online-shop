import Image from "next/image";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-[#fed1ff] to-[#e1ffea22] flex">
      {/* Bagian Kiri (Hero Left) */}
      <div className="flex-1 flex flex-col justify-center gap-5 pl-44 leading-tight">
        <h2 className="text-[26px] font-semibold text-gray-900">NEW ARRIVAL ONLY</h2>

        <div className="flex items-center gap-5">
          <p className="text-[100px] font-bold text-gray-900">New</p>
          <Image src="/assets/hand_icon.png" alt="hand icon" width={105} height={105} />
        </div>

        <p className="text-[100px] font-bold text-gray-900">Collection</p>
        <p className="text-[100px] font-bold text-gray-900">For Everyone</p>

        {/* Tombol */}
        <Link href="/product" passHref>
          <button className="flex justify-center items-center gap-4 w-[310px] h-[70px] rounded-full mt-8 bg-[#ff4141] text-white text-[22px] font-medium">
            Latest Collection
            <Image src="/assets/arrow.png" alt="arrow icon" width={30} height={30} />
          </button>
        </Link>
      </div>

      {/* Bagian Kanan (Hero Right) */}
      <div className="flex-1 flex justify-center items-center">
        <Image src="/assets/hero_image.png" alt="hero" width={500} height={500} className="rounded-lg " />
      </div>
    </div>
  );
};

export default Hero;
