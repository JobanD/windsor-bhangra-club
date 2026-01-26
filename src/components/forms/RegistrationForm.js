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

const RegistrationForm = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const isFirstRender = useRef(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    registerFor: "",
    age: "",
    sex: "",
    notes: "",
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

  const validateAge = (age) => {
    return /^[0-9]+$/.test(age) && age > 0;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.name) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.registerFor) {
      newErrors.registerFor = "Please select an option.";
    }
    if (!formData.age || !validateAge(formData.age)) {
      newErrors.age = "Please enter a valid age.";
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!formData.sex) {
      newErrors.sex = "Please select your sex.";
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

  const handleSelectChange = (name, value) => {
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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Registration successful!");
        setOpen(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          registerFor: "",
          age: "",
          sex: "",
          notes: "",
          honeypot: "",
        });
      } else {
        setMessage("Error with registration");
        setOpen(true);
      }
    } catch (error) {
      setMessage("Error with registration");
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
          ? "There was a problem with your registration."
          : "We have received your registration and will get back to you shortly.",
        status: message.includes("Error") ? "error" : "success",
        duration: 6000,
      });
      handleClose();
    }
  }, [open, toast, message]);

  const inputClassName =
    "w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm text-primary shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30";

  return (
    <form onSubmit={handleSendEmail} noValidate className="mt-3 space-y-4">
      <h2 className="text-2xl font-semibold text-primary mb-4">Register</h2>
      <div className="flex flex-col space-y-4">
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
          name="phone"
          placeholder="Optional Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          className={inputClassName}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        <Select
          onValueChange={(value) => handleSelectChange("registerFor", value)}
          required
        >
          <SelectTrigger className={inputClassName}>
            <SelectValue placeholder="Register For" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Event 1">Event 1</SelectItem>
            <SelectItem value="Event 2">Event 2</SelectItem>
            <SelectItem value="Event 3">Event 3</SelectItem>
          </SelectContent>
        </Select>
        {errors.registerFor && (
          <p className="text-red-500 text-sm">{errors.registerFor}</p>
        )}
        <input
          type="text"
          name="age"
          placeholder="Age of Attendee"
          value={formData.age}
          onChange={handleInputChange}
          required
          className={inputClassName}
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        <Select
          onValueChange={(value) => handleSelectChange("sex", value)}
          required
        >
          <SelectTrigger className={inputClassName}>
            <SelectValue placeholder="Sex" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows="4"
          className={`${inputClassName} resize-none`}
        />
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
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
