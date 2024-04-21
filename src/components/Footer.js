import React from "react";
import { Box, Container, Typography, Link, Grid } from "@mui/material";
import Image from "next/image";

// icons
import InstagramLogo from "../../public/instagram.svg";
import FacebookLogo from "../../public/facebook.svg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary-light to-primary-dark py-5 text-white">
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              IPCHAS
            </Typography>
            <Typography variant="subtitle1">
              Something here to give the footer a purpose!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex" justifyContent="start" alignItems="center">
              <Link
                href="https://www.instagram.com/windsorbhangraclub/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mr: 1, display: "inline-flex" }}
              >
                <Image
                  src={InstagramLogo}
                  alt="Instagram"
                  width={50}
                  height={50}
                  className="filter brightness-0 invert"
                />
              </Link>
              <Link
                href="https://www.facebook.com/windsorbhangra/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "inline-flex" }}
              >
                <Image
                  src={FacebookLogo}
                  alt="Facebook"
                  width={50}
                  height={50}
                  className="filter brightness-0 invert"
                />
              </Link>
            </Box>
            {/* Add more social media links */}
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ pt: 4 }}>
          {"© "}
          {new Date().getFullYear()}{" "}
          <Link color="inherit" href="/">
            IPCHAS
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
