"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

export default function EmbeddedCheckoutButton() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  const modalRef = useRef(null);

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch("/api/embedded-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to cents
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create checkout session");
      }

      return data.client_secret;
    } catch (error) {
      setError(error.message);
      console.error("Error fetching client secret:", error);
      throw error;
    }
  }, [amount]);

  const options = { fetchClientSecret };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
    modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    modalRef.current?.close();
  };

  return (
    <div id="checkout" className="my-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
      />
      <button className="btn" onClick={handleCheckoutClick}>
        Open Modal with Embedded Checkout
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-100 max-w-screen-2xl">
          <h3 className="font-bold text-lg">Embedded Checkout</h3>
          <div className="py-4">
            {showCheckout && (
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </form>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </dialog>
    </div>
  );
}
