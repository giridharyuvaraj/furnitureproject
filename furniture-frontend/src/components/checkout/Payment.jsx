import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../services/paymentService";
import { placeOrderWithItems } from "../../services/orderService";
import { clearCart } from "../../redux/slices/cartSlice";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#333",
      fontFamily: "'Poppins', sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
      padding: "12px",
    },
    invalid: {
      color: "#e63946",
      iconColor: "#e63946",
    },
  },
};

const Payment = ({ amount, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) {
      setError("Stripe is not loaded. Please refresh the page.");
      return;
    }

    if (amount <= 0) {
      setError("Invalid amount. Please add items to cart.");
      return;
    }

    setLoading(true);

    try {
  const response = await createPaymentIntent(amount);

  const clientSecret = response?.clientSecret;
  const backendError = response?.error;

  if (backendError) {
    setError(backendError);
    return;
  }

  if (!clientSecret) {
    setError("Payment setup failed. Please check Stripe backend.");
    return;
  }

      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || "Payment failed. Please try again.");
      } else if (paymentIntent.status === "succeeded") {
        setSuccess(true);
        try {
          await placeOrderWithItems(cartItems);
          dispatch(clearCart());
        } catch (orderErr) {
          console.error("Order save failed:", orderErr);
          const msg =
            orderErr?.response?.data?.message ||
            orderErr?.response?.data?.error ||
            "Payment succeeded but order could not be saved. Please contact support.";
          setError(msg);
          setSuccess(false);
          return;
        }
        setTimeout(() => navigate("/orders"), 2000);
      }
    } catch (err) {
      console.error("Payment error:", err);
      const msg = err?.response?.data?.error
        || err?.response?.data?.message
        || err?.message
        || "Payment failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="payment_success">
        <div className="success_icon">✓</div>
        <h4>Payment Successful!</h4>
        <p>Your order has been placed. Redirecting to orders...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="payment_form">
      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}

      <div className="card_element_wrapper">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <button
        type="submit"
        className="btn1 w-100 mt-4"
        disabled={!stripe || loading || amount <= 0}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Processing...
          </>
        ) : (
          `Pay ₹${amount.toLocaleString()}`
        )}
      </button>

      <p className="payment_secure mt-3 text-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-1">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
        Secured by Stripe
      </p>
    </form>
  );
};

export default Payment;
