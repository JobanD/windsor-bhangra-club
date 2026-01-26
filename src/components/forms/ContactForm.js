"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const isFirstRender = useRef(true); // Ref to track initial render

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    name: "",
    message: "",
    honeypot: "", // honeypot field
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject) {
      newErrors.subject = "Please enter a subject.";
    }
    if (!formData.name) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.message) {
      newErrors.message = "Please enter a message.";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (formData.honeypot) {
      console.log("Bot detected!");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setOpen(true);
        setFormData({
          email: "",
          subject: "",
          name: "",
          message: "",
          honeypot: "",
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

  const inputClassName =
    "w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm text-primary shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30";

  return (
    <form onSubmit={handleSendEmail} noValidate className="mt-3 space-y-4">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Message Us Directly
      </h2>
      <div className="flex flex-col space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className={inputClassName}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          className={inputClassName}
        />
        {errors.subject && (
          <p className="text-red-500 text-sm">{errors.subject}</p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className={inputClassName}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows="6"
          className={`${inputClassName} resize-none`}
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          className="hidden"
        />
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dark"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
