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
          className="text-primary underline underline-offset-4"
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
    <div className="mx-auto max-w-6xl px-6 pb-16">
      <header className="py-10 text-center">
        <div className="rounded-3xl border border-white/70 bg-white/85 px-6 py-10 shadow-xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/60">
            News
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary sm:text-5xl">
            Current Events
          </h1>
          <p className="mt-4 text-base text-primary/80 sm:text-lg">
            Keep up to date with the latest happenings with IPCHAS!
          </p>
        </div>
      </header>
      <section className="space-y-10">
        {posts.map((post, index) => (
          <Card
            key={index}
            className="flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-4 text-left shadow-xl backdrop-blur"
          >
            <CardContent className="w-full">
              <CardHeader className="space-y-3 p-0">
                <CardTitle className="text-3xl font-semibold text-primary">
                  {post.title}
                </CardTitle>
                <p className="text-sm text-primary/60">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                {/* Render Rich Text description with hyperlinks */}
                <CardDescription
                  as="div"
                  className="prose prose-sm max-w-none text-primary/80 sm:prose-base"
                >
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
