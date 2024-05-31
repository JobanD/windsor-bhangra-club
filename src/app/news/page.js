import React from "react";
import Image from "next/image";
import { fetchDataFromContentful, fetchImageData } from "@/contentful/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import NewsDescription from "@/components/NewsDescription";

export const metadata = {
  metadataBase: new URL("https://www.windsorbhangraclub.com"),
  title: "News - IPCHAS & WBC",
  description:
    "Stay updated with the latest news and announcements from IPCHAS and Windsor Bhangra Club. Learn about our recent activities, achievements, and community involvement.",
  keywords:
    "news, updates, announcements, IPCHAS, WBC, Windsor Bhangraclub, Punjabi culture, Sikhi culture, community involvement, Windsor, Ontario, Canada",
  openGraph: {
    title: "News - IPCHAS & WBC",
    description:
      "Stay updated with the latest news and announcements from IPCHAS and Windsor Bhangra Club. Learn about our recent activities, achievements, and community involvement.",
    images: [
      {
        url: "/public/logo-no-bg.png",
        width: 800,
        height: 600,
        alt: "News - IPCHAS & WBC",
      },
    ],
    url: "https://www.windsorbhangraclub.com/news",
  },
  alternates: {
    canonical: "https://www.windsorbhangraclub.com/news",
  },
};

export default async function NewsPage() {
  // Fetch news posts data
  const newsData = await fetchDataFromContentful("newspost", 10);

  if (!newsData || newsData.error) {
    return <div>Error: {newsData.error}</div>;
  }

  // Process the news posts data
  const posts = await Promise.all(
    newsData.items.map(async (post) => {
      const images = post.fields.image
        ? await Promise.all(
            post.fields.image.map(
              async (image) => await fetchImageData(image.sys.id)
            )
          )
        : [];

      return {
        ...post.fields,
        images: images,
      };
    })
  );

  return (
    <div className="container my-2 p-4">
      <header className="text-center py-10">
        <div className="bg-gradient-to-r from-primary-dark to-primary text-secondary-light rounded-lg shadow-md mx-5 p-8">
          <h1 className="text-5xl font-bold mb-4">Current Events</h1>
          <p className="text-xl">
            Keep up to date with the latest happenings with IPCHAS!
          </p>
        </div>
      </header>
      <section className="space-y-10 px-1 md:px-4">
        {posts.map((post, index) => (
          <Card
            key={index}
            className="flex flex-col mb-10 p-2 shadow-lg rounded-lg overflow-hidden bg-white transition-transform transform text-center"
          >
            <CardContent className="w-full">
              <CardHeader>
                <CardTitle className="text-4xl font-bold mb-2">
                  {post.title}
                </CardTitle>
                <p className="text-gray-600 mb-4">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <NewsDescription description={post.description} />
              </CardHeader>
              {post.images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
                  {post.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                    >
                      <Image
                        src={`${image}`}
                        alt={`Image for ${post.title}`}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
