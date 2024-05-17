"use client";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importing Select components from ShadCN

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
  const { addToast } = useToast();

  const [emailData, setEmailData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    message: "",
    donationType: "",
    amount: "",
    paymentType: "",
  });

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
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      if (data.success) {
        setOpen(true);
        setEmailData({
          email: "",
          firstname: "",
          lastname: "",
          phone: "",
          message: "",
          donationType: "",
          amount: "",
          paymentType: "",
        });
      } else {
        setOpen(true);
      }
    } catch (error) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      addToast({
        title: "Message sent successfully!",
        description:
          "We have received your message and will get back to you shortly.",
        status: "success",
        duration: 6000,
      });
      handleClose();
    }
  }, [open, addToast]);

  return (
    <form onSubmit={handleSendEmail} noValidate className="mt-3 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Donate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={emailData.email}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md w-full bg-white"
          />
        </div>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={emailData.firstname}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={emailData.lastname}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        <div className="col-span-1 sm:col-span-2">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={emailData.phone}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md w-full bg-white"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Select
            value={emailData.donationType}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "donationType", value } })
            }
            required
          >
            <SelectTrigger className="p-2 border border-gray-300 rounded-md w-full bg-white">
              <SelectValue placeholder="Type of Donation" />
            </SelectTrigger>
            <SelectContent>
              {donationTypes.map((type) => (
                <SelectItem key={type.id} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <textarea
            name="message"
            placeholder="Message"
            value={emailData.message}
            onChange={handleInputChange}
            required
            rows="6"
            className="p-2 border border-gray-300 rounded-md w-full bg-white"
          />
        </div>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={emailData.amount}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        <div className="col-span-1 sm:col-span-2">
          <Select
            value={emailData.paymentType}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "paymentType", value } })
            }
            required
          >
            <SelectTrigger className="p-2 border border-gray-300 rounded-md w-full bg-white">
              <SelectValue placeholder="Payment Type" />
            </SelectTrigger>
            <SelectContent>
              {paymentTypes.map((type) => (
                <SelectItem key={type.id} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="w-full py-2 px-4 bg-primary text-white font-bold rounded-md hover:bg-secondary-dark transition"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default DonateForm;
