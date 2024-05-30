"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

const CheckoutForm = ({ clientSecret, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Send payment success email
      try {
        const response = await fetch("/api/payment-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: formData.amount * 100, // Convert to cents
            name: formData.name,
            email: formData.email,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send confirmation email");
        }

        addToast({
          title: "Success",
          description: "Payment successful and email sent!",
          status: "success",
          duration: 6000,
        });
      } catch (emailError) {
        addToast({
          title: "Error",
          description: emailError.message,
          status: "error",
          duration: 6000,
        });
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: "tabs" }} />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full my-4 py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

const CustomCheckoutForm = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [formData, setFormData] = useState({
    amount: 0,
    name: "",
    email: "",
    phone: "",
  });
  const modalRef = useRef(null);
  const { addToast } = useToast();

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: formData.amount * 100 }), // Convert to cents
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create payment intent");
      }

      setClientSecret(data.clientSecret);
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 6000,
      });
    }
  }, [formData.amount, addToast]);

  useEffect(() => {
    if (showCheckout) {
      fetchClientSecret();
    }
  }, [showCheckout, fetchClientSecret]);

  const handleCheckoutClick = () => {
    setShowCheckout(true);
    if (clientSecret) {
      modalRef.current?.showModal();
    }
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    modalRef.current?.close();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (formData.amount <= 0 || !formData.name || !formData.email) {
      addToast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 6000,
      });
      return;
    }
    handleCheckoutClick();
  };

  return (
    <div id="checkout" className="my-4">
      <form onSubmit={handleSubmit} className="mt-3 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Amount (in USD)
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleInputChange}
            min="1"
            required
            className="p-2 border border-gray-300 rounded-md w-full bg-white mt-1"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md w-full bg-white mt-1"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md w-full bg-white mt-1"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Phone (optional)
          <input
            type="tel"
            name="phone"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full bg-white mt-1"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 transition"
        >
          Pay Now
        </button>
      </form>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-100 max-w-screen-lg p-6">
          <h3 className="font-bold text-lg">Embedded Checkout</h3>
          <div className="py-4">
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} formData={formData} />
              </Elements>
            )}
          </div>
          <div className="modal-action">
            <button className="btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CustomCheckoutForm;
