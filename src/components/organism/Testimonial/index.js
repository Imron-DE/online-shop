import React, { useState, useEffect } from "react";
import Image from "next/image";

const TestimonialData = [
  {
    id: 1,
    name: "Lena",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "/assets/lena1.png",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "/assets/lena2.png",
  },
  {
    id: 3,
    name: "Kate Winslate",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "/assets/lena3.png",
  },
  {
    id: 4,
    name: "Angelina Jolie",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "/assets/lena4.png",
  },
  {
    id: 5,
    name: "Ariana",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "/assets/lena5.png",
  },
  {
    id: 6,
    name: "Rose Parker",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "/assets/lena6.png",
  },
  {
    id: 7,
    name: "Nadia Vega",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "/assets/lena7.png",
  },
  {
    id: 8,
    name: "Berliana",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "/assets/lena8.png",
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TestimonialData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TestimonialData.length) % TestimonialData.length);
  };

  // Mengatur slider otomatis
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // 5000ms = 5 detik
    return () => clearInterval(interval); // Membersihkan interval saat komponen dibersihkan
  }, []);

  return (
    <div className="py-10 mb-10">
      <div className="container items-center justify-center mx-auto">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">What our customers are saying</p>
          <h1 className="text-3xl font-bold">Testimonials</h1>
        </div>

        {/* Slider */}
        <div className="relative w-full h-full mx-auto  ">
          <div className="flex items-center justify-center gap-4 overflow-hidden">
            {/* Prev Button */}
            <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
              &lt;
            </button>

            {/* Testimonial Cards */}
            <div className="flex gap-2 transition-transform duration-500 items-center" style={{ transform: `translateX(-${(currentIndex % TestimonialData.length) * 33.333}%)` }}>
              {TestimonialData.map((data) => (
                <div key={data.id} className="flex-none w-1/3 p-4">
                  <div className="flex flex-col gap-6 shadow-lg py-8 px-6 mx-4 rounded-xl bg-white relative">
                    <div className="mb-4 flex justify-center">
                      <Image src={data.img} alt={data.name} className="rounded-full w-50 h-50 object-cover" width={200} height={200} />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-xl text-gray-500 text-center">{data.text}</p>
                      <h1 className="text-2xl font-bold text-black/80">{data.name}</h1>
                    </div>
                    <p className="text-black/20 text-9xl font-serif absolute top-0 right-0 opacity-30">,,</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
