"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";

// images
import logo from "../../public/logo-no-bg.png";

const Navbar = () => {
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [aboutMenuAnchorEl, setAboutMenuAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
  const isAboutMenuOpen = Boolean(aboutMenuAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleAboutMenuOpen = (event) => {
    setAboutMenuAnchorEl(event.currentTarget);
  };

  const handleAboutMenuClose = () => {
    setAboutMenuAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/about">
          <Typography textAlign="center">About Us</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/team">
          <Typography textAlign="center">Meet the Team</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/registration">
          <Typography textAlign="center">Registration</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/sponsors">
          <Typography textAlign="center">Sponsors</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/donate">
          <Typography textAlign="center">Donate</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/events">
          <Typography textAlign="center">Event Calendar</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/contact">
          <Typography textAlign="center">Contact Us</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/services">
          <Typography textAlign="center">Media</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

  const renderAboutDropdownMenu = (
    <Menu
      anchorEl={aboutMenuAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isAboutMenuOpen}
      onClose={handleAboutMenuClose}
    >
      <MenuItem onClick={handleAboutMenuClose}>
        <Link href="/about/#history">
          <Typography textAlign="center">History</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleAboutMenuClose}>
        <Link href="/team">
          <Typography textAlign="center">Meet the Team</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="sticky" color="primary" sx={{ height: "125px" }}>
      <Toolbar sx={{ maxWidth: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: "1",
          }}
        >
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              href="/"
              width={110}
              height={110}
              placeholder="blur"
            />
          </Link>
          <Link href="/">
            <Typography variant="h4" component="div">
              IPCHAS
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit">
            <Link href="/about">About Us</Link>
          </Button>
          <Button color="inherit">
            <Link href="/team">Our Team</Link>
          </Button>
          <Button color="inherit">
            <Link href="/registration">Registration</Link>
          </Button>
          <Button color="inherit">
            <Link href="/sponsors">Sponsors</Link>
          </Button>
          <Button color="inherit">
            <Link href="/donate">Donate</Link>
          </Button>
          <Button color="inherit">
            <Link href="/events">Event Calendar</Link>
          </Button>
          <Button color="inherit">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button color="inherit">
            <Link href="/services">Media</Link>
          </Button>
        </Box>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", lg: "none" } }} // This line controls visibility
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {renderMobileMenu}
    </AppBar>
  );
};

export default Navbar;
