import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const StripeForm = ({ intentoPago, total =1000, cleanCart,user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const cardStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#fff",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async ()=>{
    event.preventDefault()

    if(!stripe || !elements){
        return
    }

    setLoading(false)

    try {
        console.log(intentoPago)
        if(!intentoPago || !intentoPago.clientSecret){
            console.log("intento de pago error")
            throw new Error("no hay intento de pago valido")
        }

        const clientSecret = intentoPago.clientSecret

        const {error} = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement),
                billing_details:{
                    name: user?.name || "user1",
                    email: user?.email || "nicdurelli@gmail.com"
                }
            }
        })

        if(error){
            toast.error("error en el pago:",error.message)
            console.log(error.message)
            navigate("/errorPago")
        }else{
            toast.success("pago con exito")
            navigate("/resumenPago")
            //cleanCart()
        }
    } catch (error) {
        toast.error("error en el pago:",error)
        console.log(error)
    }
  }

  return (
    <div>
      <h1>Informacion de pago</h1>
      <form onSubmit={handleSubmit}>
        <label>Datos tarjeta</label>
        <div>
          <CardElement options={cardStyle} />
        </div>
        <button disabled={!stripe || !loading}>Pagar {1000}</button>
      </form>
    </div>
  );
};

export default StripeForm;
