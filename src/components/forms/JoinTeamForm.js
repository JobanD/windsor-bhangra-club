"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importing Select components from ShadCN

const JoinTeamForm = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const isFirstRender = useRef(true);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    reason: "",
    notes: "",
    phone: "",
    honeypot: "", // honeypot field
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[1-9]\d{1,14}$/.test(phone); // E.164 format
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.name) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.reason) {
      newErrors.reason = "Please select a reason to join.";
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
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

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      reason: value,
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
      const response = await fetch("/api/join-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Message sent successfully!");
        setOpen(true);
        setFormData({
          email: "",
          name: "",
          reason: "",
          notes: "",
          phone: "",
          honeypot: "",
        });
      } else {
        setMessage("Error sending email");
        setOpen(true);
      }
    } catch (error) {
      setMessage("Error sending email");
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
        title: message,
        description: message.includes("Error")
          ? "There was a problem sending your message."
          : "We have received your message and will get back to you shortly.",
        status: message.includes("Error") ? "error" : "success",
        duration: 6000,
      });
      handleClose();
    }
  }, [open, toast, message]);

  return (
    <form onSubmit={handleSendEmail} noValidate className="mt-3 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Join The Team</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <Select onValueChange={handleSelectChange} required>
          <SelectTrigger className="p-2 border border-gray-300 rounded-md w-full bg-white">
            <SelectValue placeholder="Reason to Join" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Reason 1">Reason 1</SelectItem>
            <SelectItem value="Reason 2">Reason 2</SelectItem>
            <SelectItem value="Reason 3">Reason 3</SelectItem>
          </SelectContent>
        </Select>
        {errors.reason && (
          <p className="text-red-500 text-sm">{errors.reason}</p>
        )}
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows="4"
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        <input
          type="text"
          name="phone"
          placeholder="Optional Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md w-full bg-white"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
          className="w-full py-2 px-4 bg-primary text-white font-bold rounded-md hover:bg-secondary-dark transition"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default JoinTeamForm;
