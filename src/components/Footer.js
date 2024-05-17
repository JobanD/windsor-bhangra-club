import React from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import InstagramLogo from "../../public/instagram.svg";
import FacebookLogo from "../../public/facebook.svg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary-light to-primary-dark py-5 text-white">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-left">
          <div>
            <h6 className="text-lg font-bold mb-2">IPCHAS</h6>
            <p>Something here to give the footer a purpose!</p>
          </div>
          <div>
            <h6 className="text-lg font-bold mb-2">Follow Us</h6>
            <div className="flex justify-center sm:justify-start items-center space-x-4">
              <Link
                href="https://www.instagram.com/windsorbhangraclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Image
                  src={InstagramLogo}
                  alt="Instagram"
                  width={50}
                  height={50}
                  className="filter brightness-0 invert"
                />
              </Link>
              <Link
                href="https://www.facebook.com/windsorbhangra/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Image
                  src={FacebookLogo}
                  alt="Facebook"
                  width={50}
                  height={50}
                  className="filter brightness-0 invert"
                />
              </Link>
            </div>
            {/* Add more social media links */}
          </div>
        </div>
        <p className="text-center pt-4 text-sm">
          {"© "}
          {new Date().getFullYear()}{" "}
          <a className="text-white hover:underline" href="/">
            IPCHAS
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
