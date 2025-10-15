import useCart from "../hooks/useCart";

function TotalCarrito() {
  const { clearCart, getTotal } = useCart();
  return (
    <div className="bg-gray-900 rounded-lg p-4 relative text-white">
      <div>
        <p>Total a pagar: ${getTotal()}</p>
      </div>
      <div>
        <button onClick={()=>{clearCart()}}>vaciar carrito</button>
        <button onClick={()=>{clearCart()}}>Comprar</button>
      </div>
    </div>
  );
}

export default TotalCarrito;
