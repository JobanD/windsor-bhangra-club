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
    <div className="pb-16">
      {/* Hero Section */}
      <div className="relative h-[420px] overflow-hidden rounded-b-[48px] bg-primary/90">
        <Image
          src={banner}
          alt="Banner Image"
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
          }}
          quality={100}
          className="absolute inset-0 z-0 object-cover"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-0"></div>
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Registration
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl lg:text-6xl">
            Welcome to Our Organization
          </h1>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Join us and be a part of something great.
          </p>
        </div>
      </div>

      {/* Brief Description Card */}
      <div className="mx-auto -mt-10 max-w-5xl px-6">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-8 text-center shadow-xl backdrop-blur">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Get Involved
          </h2>
          <p className="mt-4 text-base text-primary/70 sm:text-lg">
            Whether you&apos;re looking to join our team, register for an event,
            or donate, we have opportunities for everyone. Explore the tabs
            below to get started.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mx-auto my-10 max-w-6xl px-6">
        <h1 className="text-3xl font-semibold text-primary mb-6 text-center sm:text-4xl">
          Registration
        </h1>
        <Tabs defaultValue="joinTeam" className="w-full">
          <TabsList className="flex flex-col gap-2 rounded-3xl bg-white/80 p-2 shadow-lg backdrop-blur sm:flex-row">
            <TabsTrigger
              value="joinTeam"
              className="flex-1 rounded-full border border-primary/20 px-4 py-2 text-center text-sm font-semibold text-primary transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Join Team
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="flex-1 rounded-full border border-primary/20 px-4 py-2 text-center text-sm font-semibold text-primary transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Registration
            </TabsTrigger>
          </TabsList>
          <div className="mt-6 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl backdrop-blur">
            <TabsContent value="joinTeam" className="mt-2">
              <JoinTeamForm />
            </TabsContent>
            <TabsContent value="register" className="mt-2">
              <RegistrationForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
