import Image from "next/image";
import Link from "next/link";

// icons
import InstagramLogo from "../../public/instagram.svg";
import FacebookLogo from "../../public/facebook.svg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary-light to-primary-dark py-8 text-white">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <h6 className="text-lg font-bold mb-2">About IPCHAS</h6>
            <p>
              Our mission is to support the Windsor community through cultural
              preservation and education. Join us in celebrating and preserving
              Punjabi culture through events, workshops, and more.
            </p>
          </div>
          <div>
            <h6 className="text-lg font-bold mb-2">Contact Us</h6>
            <p>
              Email:{" "}
              <Link
                href="mailto:admin@windsorbhangraclub.com"
                className="underline"
              >
                admin@windsorbhangraclub.com
              </Link>
            </p>
            <p>
              Phone:{" "}
              <Link href="tel:+15199907464" className="underline">
                +1 (519) 990-7464
              </Link>
            </p>
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
                  width={30}
                  height={30}
                  className="filter brightness-0 invert"
                />
              </Link>
              <Link
                href="https://www.facebook.com/windsorbhangraclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Image
                  src={FacebookLogo}
                  alt="Facebook"
                  width={30}
                  height={30}
                  className="filter brightness-0 invert"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-400 mt-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <h6 className="text-lg font-bold mb-2">Quick Links</h6>
              <ul className="space-y-1">
                <li>
                  <Link href="/about" className="underline hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="underline hover:text-gray-300"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="underline hover:text-gray-300">
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="underline hover:text-gray-300"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/registration"
                    className="underline hover:text-gray-300"
                  >
                    Registration
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-lg font-bold mb-2">Sitemap</h6>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="underline hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="underline hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="underline hover:text-gray-300"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="underline hover:text-gray-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center pt-4 text-sm">
          {"© "}
          {new Date().getFullYear()}{" "}
          <a className="text-white hover:underline" href="/">
            IPCHAS
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
