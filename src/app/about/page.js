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
    <div className="gap-5">
      <div className="text-center py-5 px-1">
        <div className="bg-gradient-to-r from-primary-dark to-primary text-secondary-light text-center rounded-lg shadow-md mx-5 p-5">
          <h1 className="text-5xl font-bold mb-4">
            {aboutData.items[0].fields.aboutTitle}
          </h1>
          <div className="text-xl">
            {aboutData.items[0].fields.aboutDescription}
          </div>
        </div>
      </div>
      <section className="space-y-10 px-10">
        {sections.map((section, index) => (
          <Card
            key={index}
            className={`flex flex-col lg:flex-row items-center lg:items-start mb-10 shadow-lg rounded-lg overflow-hidden ${
              index % 2 === 0
                ? "bg-primary-light text-white"
                : "bg-secondary-light text-primary-dark"
            }`}
          >
            {index % 2 === 0 && section.imageUrl && (
              <div className="lg:w-1/3">
                <Image
                  src={section.imageUrl}
                  alt={section.aboutSectionTitle}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full p-8"
                />
              </div>
            )}
            <CardContent className="flex flex-col justify-center p-6 lg:w-2/3">
              <CardHeader>
                <CardTitle className="text-4xl font-bold mb-2">
                  {section.aboutSectionTitle}
                </CardTitle>
                <div className="text-lg">
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
                  className="object-cover w-full h-full p-8"
                />
              </div>
            )}
          </Card>
        ))}
      </section>
      <section className="my-10 text-center">
        <div className="bg-primary text-white rounded-lg shadow-md mx-5 p-5">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">
            Interested in learning more about our work or joining our team? We
            would love to hear from you!
          </p>
          <Link
            className="px-8 py-3 bg-secondary-light text-primary-dark rounded-md font-semibold hover:bg-secondary-dark"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
