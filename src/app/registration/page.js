import React from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import JoinTeamForm from "@/components/forms/JoinTeamForm";
import RegistrationForm from "@/components/forms/RegistrationForm";

import banner from "../../../public/windsor_bhanga_banner.jpeg";

export const metadata = {
  metadataBase: new URL("https://www.windsorbhangraclub.com"),
  title: "Registration - IPCHAS & WBC",
  description:
    "Register for upcoming events and programs with IPCHAS and Windsor Bhangraclub. Join us in our mission to promote Punjabi/Sikhi culture and community involvement.",
  keywords:
    "registration, sign up, events, programs, IPCHAS, WBC, Windsor Bhangra Club, Punjabi culture, Sikhi culture, Windsor, Ontario, Canada",
  openGraph: {
    title: "Registration - IPCHAS & WBC",
    description:
      "Register for upcoming events and programs with IPCHAS and Windsor Bhangra Club. Join us in our mission to promote Punjabi/Sikhi culture and community involvement.",
    images: [
      {
        url: "/public/logo-no-bg.png",
        width: 800,
        height: 600,
        alt: "Registration - IPCHAS & WBC",
      },
    ],
    url: "https://www.windsorbhangraclub.com/registration",
  },
  alternates: {
    canonical: "https://www.windsorbhangraclub.com/registration",
  },
};

const Page = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-96 bg-primary flex items-center justify-center">
        <Image
          src={banner}
          alt="Banner Image"
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
          }}
          quality={100}
          className="absolute z-0"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>{" "}
        {/* Semi-transparent overlay */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold">Welcome to Our Organization</h1>
          <p className="text-2xl mt-4">
            Join us and be a part of something great.
          </p>
        </div>
      </div>

      {/* Brief Description Card */}
      <div className="container mx-auto mt-2 p-4">
        <div className="bg-secondary-light p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Get Involved</h2>
          <p className="text-lg text-center">
            Whether you&apos;re looking to join our team, register for an event,
            or donate, we have opportunities for everyone. Explore the tabs
            below to get started.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto my-8 p-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Registration</h1>
        <Tabs defaultValue="joinTeam" className="w-full">
          <TabsList className="flex justify-around p-2 rounded-t-lg">
            <TabsTrigger
              value="joinTeam"
              className="flex-1 m-2 px-4 py-2 text-center text-lg font-semibold border-2 border-primary-dark rounded-lg transition-all duration-200"
            >
              Join Team
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="flex-1 m-2 px-4 py-2 text-center text-lg font-semibold border-2 border-primary-dark rounded-lg transition-all duration-200"
            >
              Registration
            </TabsTrigger>
          </TabsList>
          <div className="bg-secondary text-primary-dark rounded-b-lg shadow-md">
            <TabsContent value="joinTeam" className="mt-4 p-6">
              <JoinTeamForm />
            </TabsContent>
            <TabsContent value="register" className="mt-4 p-6">
              <RegistrationForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
