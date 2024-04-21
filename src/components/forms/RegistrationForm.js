"use client";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const RegistrationForm = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();

  const [emailData, setEmailData] = useState({
    email: "",
    subject: "",
    name: "",
    message: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending emailData:", emailData);
      const response = await fetch("./contact/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      if (data.success) {
        setMessage(data.message);
        setOpen(true);
        setEmailData({
          email: "",
          subject: "",
          name: "",
          message: "",
        });
      } else {
        setMessage(data.message);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Error sending email");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSendEmail}
        noValidate
        sx={{ mt: 3 }}
      >
        <Typography variant="h4" gutterBottom>
          Register Now!
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="email"
          name="email"
          value={emailData.email}
          onChange={handleInputChange}
          sx={{ background: "white" }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="subject"
          name="subject"
          value={emailData.subject}
          onChange={handleInputChange}
          sx={{ background: "white" }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="name"
          name="name"
          value={emailData.name}
          onChange={handleInputChange}
          sx={{ background: "white" }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          rows={6}
          label="message"
          name="message"
          value={emailData.message}
          onChange={handleInputChange}
          sx={{ background: "white" }}
        />
        <Button
          aria-disabled={pending}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default RegistrationForm;
