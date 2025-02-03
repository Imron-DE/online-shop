import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const TestimonialData = [
  { id: 1, name: "Lena", text: "Lorem ipsum dolor sit amet...", img: "/assets/lena1.png" },
  { id: 2, name: "Satya Nadella", text: "Lorem ipsum dolor sit amet...", img: "/assets/lena2.png" },
  { id: 3, name: "Kate Winslate", text: "Lorem ipsum dolor sit amet...", img: "/assets/lena3.png" },
  { id: 4, name: "Angelina Jolie", text: "Lorem ipsum dolor sit amet...", img: "/assets/lena4.png" },
  { id: 5, name: "Ariana", text: "Lorem ipsum dolor sit amet...", img: "/assets/lena5.png" },
  { id: 6, name: "Rose Parker", text: "Lorem ipsum dolor sit amet...", img: "/assets/lena6.png" },
  { id: 7, name: "Nadia Vega", text: "Lorem ipsum dolor sit amet...", img: "/assets/lena7.png" },
  { id: 8, name: "Berliana", text: "Lorem ipsum dolor sit amet...", img: "/assets/lena8.png" },
];

const itemsPerPage = 3;
const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(TestimonialData.length / itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="py-10 mb-10">
      <div className="container items-center justify-center mx-auto">
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">What our customers are saying</p>
          <h1 className="text-3xl font-bold">Testimonials</h1>
        </div>

        <div className="relative w-full mx-auto overflow-hidden">
          <div className="flex items-center justify-between">
            <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10">
              &lt;
            </button>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex / totalSlides) * 100}%)`,
              }}
            >
              {TestimonialData.map((data, index) => (
                <div key={index} className="flex-none w-1/3 p-4 flex-shrink-0">
                  <div className="flex flex-col gap-6 shadow-lg py-8 px-6 mx-4 rounded-xl bg-white relative">
                    <div className="mb-4 flex justify-center">
                      <Image src={data.img} alt={data.name} className="rounded-full object-cover" width={200} height={200} />
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
            <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
