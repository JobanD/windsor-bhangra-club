import Image from "next/image";
import Link from "next/link";
import { fetchDataFromContentful, fetchImageData } from "@/contentful/data";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata = {
  metadataBase: new URL("https://www.windsorbhangraclub.com"),
  title: "About Us - IPCHAS & WBC",
  description:
    "Learn more about IPCHAS and Windsor Bhangra Club, our mission, vision, and the work we do to promote Punjabi/Sikhi culture and support the Windsor community.",
  keywords:
    "about, IPCHAS, WBC, Windsor Bhangra Club, mission, Punjabi culture, Sikhi culture, Windsor, Ontario, Canada",
  openGraph: {
    title: "About Us - IPCHAS & WBC",
    description:
      "Learn more about IPCHAS and Windsor Bhangra Club, our mission, vision, and the work we do to promote Punjabi/Sikhi culture and support the Windsor community.",
    images: [
      {
        url: "/public/logo-no-bg.png",
        width: 800,
        height: 600,
        alt: "About Us - IPCHAS & WBC",
      },
    ],
    url: "https://www.windsorbhangraclub.com/about",
  },
  alternates: {
    canonical: "https://www.windsorbhangraclub.com/about",
  },
};

export default async function AboutPage() {
  // Fetch basic team data
  const aboutData = await fetchDataFromContentful("aboutPage");
  const aboutSectionData = await fetchDataFromContentful("aboutSectionContent");

  if (!aboutData || aboutData.error) {
    return <div>Error: {aboutData.error}</div>;
  }

  if (!aboutSectionData || aboutSectionData.error) {
    return <div>Error: {aboutSectionData.error}</div>;
  }

  // Process the about section data
  const sections = await Promise.all(
    aboutSectionData.items.map(async (section) => {
      const imageUrl = section.fields.aboutSectionImage
        ? await fetchImageData(section.fields.aboutSectionImage.sys.id)
        : null;

      return {
        ...section.fields,
        imageUrl: imageUrl,
      };
    })
  );

  return (
    <div className="space-y-12 pb-16">
      <div className="text-center py-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/70 bg-white/80 px-6 py-10 shadow-xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/60">
            About the club
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary sm:text-5xl">
            {aboutData.items[0].fields.aboutTitle}
          </h1>
          <div className="mt-4 text-base text-primary/80 sm:text-lg">
            {aboutData.items[0].fields.aboutDescription}
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-6xl space-y-10 px-6">
        {sections.map((section, index) => (
          <Card
            key={index}
            className={`flex flex-col overflow-hidden rounded-3xl border border-white/60 shadow-xl lg:flex-row ${
              index % 2 === 0
                ? "bg-primary text-white"
                : "bg-white/90 text-primary"
            }`}
          >
            {index % 2 === 0 && section.imageUrl && (
              <div className="lg:w-1/3">
                <Image
                  src={section.imageUrl}
                  alt={section.aboutSectionTitle}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <CardContent className="flex flex-col justify-center p-8 lg:w-2/3">
              <CardHeader className="space-y-3 p-0">
                <CardTitle className="text-3xl font-semibold sm:text-4xl">
                  {section.aboutSectionTitle}
                </CardTitle>
                <div
                  className={`text-base leading-relaxed ${
                    index % 2 === 0 ? "text-white/80" : "text-primary/70"
                  }`}
                >
                  {documentToReactComponents(section.aboutSectionDescription)}
                </div>
              </CardHeader>
            </CardContent>
            {index % 2 !== 0 && section.imageUrl && (
              <div className="lg:w-1/3">
                <Image
                  src={section.imageUrl}
                  alt={section.aboutSectionTitle}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </Card>
        ))}
      </section>
      <section className="text-center">
        <div className="mx-auto max-w-4xl rounded-3xl bg-primary px-6 py-10 text-white shadow-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Interested in learning more about our work or joining our team? We
            would love to hear from you!
          </p>
          <Link
            className="mt-6 inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3 text-sm font-semibold text-secondary-foreground shadow-lg shadow-secondary/30 transition hover:bg-secondary-dark"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
