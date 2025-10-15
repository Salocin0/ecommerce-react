import useCart from "../hooks/useCart";
import CartProduct from "./CartProduct";

function ProductCartList() {
  const { cart } = useCart();
  return cart.map((item) => (<CartProduct key={item.id} item={item}/>));
}

export default ProductCartList;
