import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 shadow-2xl border-t border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo & Nama Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
          <p className="text-xl font-semibold mt-2">SHOPPER</p>
        </div>

        {/* Navigasi */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 md:mt-0">
          <li className="hover:text-gray-500 cursor-pointer">Men</li>
          <li className="hover:text-gray-500 cursor-pointer">Woman</li>
          <li className="hover:text-gray-500 cursor-pointer">Electronics</li>
          <li className="hover:text-gray-500 cursor-pointer">Jewelry</li>
        </ul>

        {/* Social Media & Hak Cipta */}
        <div className="flex flex-col items-center md:items-end mt-6 md:mt-0">
          <div className="flex gap-4">
            {/* <Image src="/assets/facebook_icon.png" alt="Facebook" width={24} height={24} /> */}
            <Image src="/assets/instagram_icon.png" alt="Instagram" width={24} height={24} />
            {/* <Image src="/assets/twitter_icon.png" alt="Twitter" width={24} height={24} /> */}
          </div>
          <p className="text-sm text-gray-500 mt-2">© 2025 SHOPPER. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
