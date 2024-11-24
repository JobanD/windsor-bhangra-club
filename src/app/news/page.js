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
import MediaModal from "@/components/MediaModal";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

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

// Rich Text Options for rendering hyperlinks and embedded videos
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      // Wrap children in a single <p> tag
      return <p className="mb-4">{children}</p>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data;
      return (
        <a
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file } = node.data.target.fields;
      if (file.contentType.startsWith("video/")) {
        return (
          <div className="my-4">
            <video controls className="rounded-lg w-full max-w-xl mx-auto">
              <source src={file.url} type={file.contentType} />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }
      return null;
    },
  },
};

export default async function NewsPage() {
  // Fetch news posts data
  const newsData = await fetchDataFromContentful("newspost", 10);

  console.log("NEWS: ", newsData);

  if (!newsData || newsData.error) {
    return <div>Error: {newsData.error}</div>;
  }

  // Process the news posts data
  const posts = await Promise.all(
    newsData.items.map(async (post) => {
      const images = post.fields.image
        ? await Promise.all(
            post.fields.image.map(
              async (image) => await fetchImageData(image.sys.id),
            ),
          )
        : [];
      const video = post.fields.video || null;

      // Combine images and video into a single media array
      const media = [
        ...images.map((image) => ({ type: "image", url: image })),
        ...(video
          ? [
              {
                type: "video",
                url: video.fields.file.url,
                contentType: video.fields.file.contentType,
              },
            ]
          : []),
      ];

      return {
        ...post.fields,
        media,
      };
    }),
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
                {/* Render Rich Text description with hyperlinks */}
                <CardDescription as="div">
                  {documentToReactComponents(post.description, richTextOptions)}
                </CardDescription>
              </CardHeader>

              {/* Pass media to the client-side modal component */}
              {post.media.length > 0 && <MediaModal media={post.media} />}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
