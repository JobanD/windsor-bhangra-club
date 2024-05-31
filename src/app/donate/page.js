import CustomPaymentForm from "@/components/forms/CustomPaymentForm";

export const metadata = {
  metadataBase: new URL("https://www.windsorbhangraclub.com"),
  title: "Donate - Support IPCHAS & WBC",
  description:
    "Support IPCHAS and Windsor Bhangra Club by making a donation. Your contributions help us promote Punjabi/Sikhi culture and support the Windsor community.",
  keywords:
    "donate, support, IPCHAS, WBC, Windsor Bhangra Club, charity, Windsor, Ontario, Canada, Punjabi culture, Sikhi culture",
  openGraph: {
    title: "Donate - Support IPCHAS & WBC",
    description:
      "Support IPCHAS and Windsor Bhangra Club by making a donation. Your contributions help us promote Punjabi/Sikhi culture and support the Windsor community.",
    images: [
      {
        url: "/public/logo-no-bg.png",
        width: 800,
        height: 600,
        alt: "Donate - Support IPCHAS & WBC",
      },
    ],
    url: "https://www.windsorbhangraclub.com/donate",
  },
  alternates: {
    canonical: "https://www.windsorbhangraclub.com/donate",
  },
};

const DonationPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center py-5 px-1">
        <div className="bg-gradient-to-r from-primary-dark to-primary text-secondary-light text-center rounded-lg shadow-md mx-5 p-5">
          <h1 className="text-5xl font-bold mb-4">Donations</h1>
          <div className="text-xl">
            Your donations help us contribute and improve our community in
            meaningful ways.
          </div>
        </div>
      </div>
      <div className="bg-white text-center rounded-lg shadow-md mx-5 p-5 my-8">
        <h2 className="text-3xl font-bold mb-4">Why Your Donation Matters</h2>
        <p className="text-lg">
          Your donation helps us fund various programs and initiatives that
          bring positive change to the community. Whether it&apos; educational
          programs, healthcare initiatives, or community support services, your
          contribution makes a difference.
        </p>
      </div>
      <div className="bg-gray-100 rounded-lg shadow-md mx-5 p-6">
        <h2 className="text-3xl font-bold mb-4">Make a Donation</h2>
        <CustomPaymentForm />
      </div>
    </div>
  );
};

export default DonationPage;
