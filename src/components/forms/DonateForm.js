"use client";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Box,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

const donationTypes = [
  { id: 1, name: "Monetary" },
  { id: 2, name: "Goods" },
  { id: 3, name: "Services" },
];

const paymentTypes = [
  { id: "credit", name: "Credit Card" },
  { id: "paypal", name: "PayPal" },
  { id: "check", name: "Check" },
];

const DonateForm = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();

  const [emailData, setEmailData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
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
      const response = await fetch("./donate/api", {
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
          Donate
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              value={emailData.email}
              onChange={handleInputChange}
              sx={{ background: "white" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Firstname"
              name="firstname"
              value={emailData.firstname}
              onChange={handleInputChange}
              sx={{ background: "white" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Lastname"
              name="lastname"
              value={emailData.lastname}
              onChange={handleInputChange}
              sx={{ background: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone"
              name="phone"
              value={emailData.phone}
              onChange={handleInputChange}
              sx={{ background: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="donation-type-label">Type of Donation</InputLabel>
              <Select
                labelId="donation-type-label"
                id="donation-type-select"
                value={emailData.donationType}
                label="Type of Donation"
                onChange={(event) =>
                  handleInputChange({
                    target: { name: "donationType", value: event.target.value },
                  })
                }
                sx={{ background: "white" }}
              >
                {donationTypes.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={6}
              label="Message"
              name="message"
              value={emailData.message}
              onChange={handleInputChange}
              sx={{ background: "white" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={emailData.amount}
              onChange={handleInputChange}
              sx={{ background: "white" }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="payment-type-label">Payment Type</InputLabel>
              <Select
                labelId="payment-type-label"
                id="payment-type-select"
                value={emailData.paymentType}
                label="Payment Type"
                onChange={(event) =>
                  handleInputChange({
                    target: { name: "paymentType", value: event.target.value },
                  })
                }
                sx={{ background: "white" }}
              >
                {paymentTypes.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              aria-disabled={pending}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
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

export default DonateForm;
