import React from "react";
import ContactForm from "@/components/forms/ContactForm"; // Adjust import path as necessary
import { Box, Grid, Typography, Link } from "@mui/material";
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
      <Box sx={{ textAlign: "center", pt: 5, px: 1 }}>
        <div className="bg-gradient-to-r from-primary-dark to-primary text-secondary-light text-center rounded-lg shadow-md mx-5">
          <Typography
            variant="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              "@media (max-width:700px)": {
                fontSize: "4rem",
              },
            }}
          >
            {data.contactTitle}
          </Typography>
          <Typography
            variant="subtitle1"
            fontSize="1.6rem"
            sx={{
              "@media (max-width:700px)": {
                fontSize: "1.1rem",
              },
            }}
          >
            {data.contactDescription}
          </Typography>
        </div>
      </Box>

      {/* Contact Information and Form */}
      <Grid container spacing={2} sx={{ px: 3, py: 5 }}>
        <Grid item xs={12} md={6}>
          {/* Contact Information */}
          <div className="bg-secondary text-primary-darker p-6 rounded-lg shadow-md">
            <Typography variant="h4" gutterBottom>
              {data.contactUsSection1Title}
            </Typography>
            <p>{data.contactInfo.address}</p>
            <p>Phone: {data.contactInfo.phone}</p>
            <p>Email: {data.contactInfo.email}</p>
            {/* Social Links */}
            <Typography variant="h6" gutterBottom sx={{ marginTop: 5 }}>
              {data.socialLinks.content[0].value}
            </Typography>
            <Box display="flex" justifyContent="start" alignItems="center">
              <Link
                href="https://www.instagram.com/windsorbhangraclub/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "primary.main", mr: 1, display: "inline-flex" }}
              >
                <Image
                  src={InstagramLogo}
                  alt="Instagram"
                  width={50}
                  height={50}
                />
              </Link>
              <Link
                href="https://www.facebook.com/windsorbhangra/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "primary.main", display: "inline-flex" }}
              >
                <Image
                  src={FacebookLogo}
                  alt="Facebook"
                  width={50}
                  height={50}
                  className="primary"
                />
              </Link>
            </Box>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Contact Form */}
          <div className="bg-secondary text-primary-darker p-6 rounded-lg shadow-md">
            <ContactForm />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
