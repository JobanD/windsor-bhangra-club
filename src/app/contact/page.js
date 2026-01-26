import React from "react";
import ContactForm from "@/components/forms/ContactForm"; // Adjust import path as necessary
import Image from "next/image";
import { getContactData } from "@/contentful/data";

// icons
import InstagramLogo from "../../../public/instagram.svg";
import FacebookLogo from "../../../public/facebook.svg";

export const metadata = {
  metadataBase: new URL("https://www.windsorbhangraclub.com"),
  title: "Contact Us - IPCHAS & WBC",
  description:
    "Get in touch with IPCHAS and Windsor Bhangra Club. We're here to answer your questions and provide information about our programs and events.",
  keywords:
    "contact, IPCHAS, WBC, Windsor Bhangra Club, get in touch, Windsor, Ontario, Canada",
  openGraph: {
    title: "Contact Us - IPCHAS & WBC",
    description:
      "Get in touch with IPCHAS and Windsor Bhangra Club. We're here to answer your questions and provide information about our programs and events.",
    images: [
      {
        url: "/public/logo-no-bg.png",
        width: 800,
        height: 600,
        alt: "Contact Us - IPCHAS & WBC",
      },
    ],
    url: "https://www.windsorbhangraclub.com/contact",
  },
  alternates: {
    canonical: "https://www.windsorbhangraclub.com/contact",
  },
};

export default async function ContactPage() {
  const data = await getContactData();

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <div className="text-center pt-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/70 bg-white/85 px-6 py-10 shadow-xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/60">
            Contact us
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary sm:text-5xl">
            {data.contactTitle}
          </h1>
          <p className="mt-4 text-base text-primary/80 sm:text-lg">
            {data.contactDescription}
          </p>
        </div>
      </div>

      {/* Contact Information and Form */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-lg backdrop-blur">
          {/* Contact Information */}
          <h2 className="text-2xl font-semibold text-primary mb-4">
            {data.contactUsSection1Title}
          </h2>
          <div className="space-y-2 text-sm text-primary/70">
            <p>{data.contactInfo.address}</p>
            <p>Phone: {data.contactInfo.phone}</p>
            <p>Email: {data.contactInfo.email}</p>
          </div>
          {/* Social Links */}
          <h3 className="text-lg font-semibold text-primary mt-6 mb-3">
            {data.socialLinks.content[0].value}
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/windsorbhangraclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-primary/10 bg-primary/5 p-3 transition hover:bg-primary/10"
            >
              <Image
                src={InstagramLogo}
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.facebook.com/windsorbhangraclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-primary/10 bg-primary/5 p-3 transition hover:bg-primary/10"
            >
              <Image src={FacebookLogo} alt="Facebook" width={24} height={24} />
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg backdrop-blur">
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
