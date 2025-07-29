import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentForm = ({ user, setShowPaymentForm, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !amount) return;

    setLoading(true);

    try {
      // Step 1: create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
      });
      const clientSecret = res.data.clientSecret;

      // Step 2: Confirm card payment
      const card = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        // Step 3: Save fund to backend
        const fundData = {
          donorEmail: user?.email,
          donorName: user?.displayName || "Anonymous",
          fundAmount: parseFloat(amount),
          fundDate: new Date().toISOString(),
          transactionId: paymentResult.paymentIntent.id,
        };

        const saveRes = await axiosSecure.post("/funds", fundData);
        if (saveRes.data?.insertedId || saveRes.data?.result?.acknowledged) {
          toast.success("Thanks for your donation!");
          setAmount("");
          refetch?.();
          setShowPaymentForm(false);
        } else {
          toast.error("Payment success but failed to record data.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full bg-base-100 border border-secondary/30 p-6 rounded-xl shadow-md"
    >
      <input
        type="number"
        placeholder="Enter amount (USD)"
        className="input input-bordered w-full focus:outline-none"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        min={1}
      />

      <div className="p-4 border rounded-md bg-base-100">
        <CardElement />
      </div>

      <button
        type="submit"
        className="btn btn-secondary w-full"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Donate Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
