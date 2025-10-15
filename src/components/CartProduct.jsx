import useCart from "../hooks/useCart";

function CartProduct({ item }) {
  const { deleteProduct,addOneProduct,removeOneProduct } = useCart();
  return (
    <div className="bg-gray-900 rounded-lg p-4 relative text-white">
      <button onClick={()=>{deleteProduct(item.id)}}>cerrar</button>
      <div>
        <div>
          <img className="w-20 h-20 object-contain rounded-lg" src={item.image} alt={item.title} />
        </div>
        <h3>{item.title}</h3>
        <p >{item.price} x {item.quantity} = {item.subTotal}</p>
        <div>
            <button onClick={()=>{addOneProduct(item.id)}}>+1</button>
            <span>|{item.quantity}|</span>
            <button onClick={()=>{removeOneProduct(item.id)}}>-1</button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
