import React from "react";
import ContactForm from "@/components/forms/ContactForm"; // Adjust import path as necessary
import Image from "next/image";
import { getContactData } from "@/contentful/data";

// icons
import InstagramLogo from "../../../public/instagram.svg";
import FacebookLogo from "../../../public/facebook.svg";

export default async function ContactPage() {
  const data = await getContactData();

  return (
    <div className="gap-5">
      {/* Hero Section */}
      <div className="text-center pt-5 px-1">
        <div className="bg-gradient-to-r from-primary-dark to-primary text-secondary-light text-center rounded-lg shadow-md mx-5 p-5">
          <h1 className="text-5xl font-bold mb-4">{data.contactTitle}</h1>
          <p className="text-xl">{data.contactDescription}</p>
        </div>
      </div>

      {/* Contact Information and Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-3 py-5">
        <div className="bg-secondary text-primary-dark p-6 rounded-lg shadow-md">
          {/* Contact Information */}
          <h2 className="text-2xl font-bold mb-4">
            {data.contactUsSection1Title}
          </h2>
          <p className="mb-2">{data.contactInfo.address}</p>
          <p className="mb-2">Phone: {data.contactInfo.phone}</p>
          <p className="mb-2">Email: {data.contactInfo.email}</p>
          {/* Social Links */}
          <h3 className="text-xl font-bold mt-5 mb-2">
            {data.socialLinks.content[0].value}
          </h3>
          <div className="flex space-x-4">
            <a
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
              />
            </a>
            <a
              href="https://www.facebook.com/windsorbhangra/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Image src={FacebookLogo} alt="Facebook" width={50} height={50} />
            </a>
          </div>
        </div>

        <div className="bg-secondary text-primary-dark p-6 rounded-lg shadow-md">
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
