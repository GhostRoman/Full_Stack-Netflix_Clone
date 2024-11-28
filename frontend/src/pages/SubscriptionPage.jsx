import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const SubscriptionPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card element is not available.");
        setLoading(false);
        return;
      }

      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: "Example User",
          },
        });

      if (paymentMethodError) {
        setError(
          paymentMethodError.message ||
            "An error occurred while creating the payment method.",
        );
        setLoading(false);
        return;
      }

      const { data } = await axios.post("/create-payment-intent", {
        amount: 1000,
        currency: "usd",
      });

      const { error: confirmError } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: paymentMethod.id,
        },
      );

      if (confirmError) {
        setError(
          confirmError.message ||
            "An error occurred during payment confirmation.",
        );
        setLoading(false);
        return;
      }

      await axios.post("/api/payment-success", {
        email: "user@example.com", // Используйте реальный email
        amount: 1000,
      });

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error("Error during payment process:", error);
      setError(error.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-semibold mb-6 text-center">Subscribe Now</h2>

      {success ? (
        <div className="text-green-500 text-center">
          <h3>Payment Successful!</h3>
          <p>Thank you for your subscription.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="card-element"
              className="block text-lg font-medium text-gray-700"
            >
              Card details
            </label>
            <CardElement
              id="card-element"
              className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !stripe}
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Processing..."
              : `Pay Now - $${(1000 / 100).toFixed(2)}`}
          </button>
          {error && (
            <div className="text-red-500 mt-4 text-center">{error}</div>
          )}
        </form>
      )}
    </div>
  );
};

export default SubscriptionPage;
