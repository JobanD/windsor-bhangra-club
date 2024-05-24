"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const isFirstRender = useRef(true); // Ref to track initial render

  const [emailData, setEmailData] = useState({
    email: "",
    subject: "",
    name: "",
    message: "",
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
      console.log("Sending emailData:", emailData);
      const response = await fetch("/api/contact", {
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
          subject: "",
          name: "",
          message: "",
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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (open) {
      toast({
        title: "Message sent successfully!",
        description:
          "We have received your message and will get back to you shortly.",
        status: "success",
        duration: 6000,
      });
      handleClose();
    }
  }, [open, toast]);

  return (
    <form onSubmit={handleSendEmail} noValidate className="mt-3 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Message Us Directly</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={emailData.email}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={emailData.name}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={emailData.message}
          onChange={handleInputChange}
          required
          rows="6"
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        <button
          type="submit"
          disabled={pending}
          className="w-full py-2 px-4 bg-primary text-white font-bold rounded-md hover:bg-secondary-dark transition"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
