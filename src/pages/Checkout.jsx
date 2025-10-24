import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import ResumenCompra from "../components/ResumenCompra";
import EnvioForm from "../components/EnvioForm";
import StripeForm from "../components/StripeForm";
import { Elements } from "@stripe/react-stripe-js";

const stripe = loadStripe(import.meta.env.VITE_STRIPE_SECRET);

const Checkout = () => {
  const { cart, getTotal, cleancart, getTotalItems, intentoPago } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <Elements stripe={stripe}>
        <ResumenCompra />
        <EnvioForm />
        <StripeForm
          intentoPago={intentoPago}
          total={getTotal}
          cleanCart={cleancart}
        />
      </Elements>
    </div>
  );
};

export default Checkout;
