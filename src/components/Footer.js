import Image from "next/image";
import Link from "next/link";

// icons
import InstagramLogo from "../../public/instagram.svg";
import FacebookLogo from "../../public/facebook.svg";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <h6 className="text-lg font-semibold mb-3">About IPCHAS</h6>
            <p className="text-sm leading-relaxed text-white/80">
              Our mission is to support the Windsor community through cultural
              preservation and education. Join us in celebrating and preserving
              Punjabi culture through events, workshops, and more.
            </p>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-3">Contact Us</h6>
            <p className="text-sm text-white/80">
              Email:{" "}
              <Link
                href="mailto:admin@windsorbhangraclub.com"
                className="underline underline-offset-4"
              >
                admin@windsorbhangraclub.com
              </Link>
            </p>
            <p className="text-sm text-white/80">
              Phone:{" "}
              <Link href="tel:+15199907464" className="underline underline-offset-4">
                +1 (519) 990-7464
              </Link>
            </p>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-3">Follow Us</h6>
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
                  className="filter brightness-0 invert opacity-80 transition hover:opacity-100"
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
                  className="filter brightness-0 invert opacity-80 transition hover:opacity-100"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-10 pt-8">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:text-left">
            <div>
              <h6 className="text-base font-semibold mb-3">Quick Links</h6>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/about" className="underline underline-offset-4 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="underline underline-offset-4 hover:text-white">
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/registration"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    Registration
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-base font-semibold mb-3">Sitemap</h6>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/" className="underline underline-offset-4 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="underline underline-offset-4 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center pt-8 text-xs text-white/70">
          {"© "}
          {new Date().getFullYear()}{" "}
          <a className="text-white hover:underline underline-offset-4" href="/">
            IPCHAS
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
