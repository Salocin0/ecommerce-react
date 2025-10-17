import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth()
  const urlapi = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  async function peticionesCart(url,metodo="GET",body = null) {
    try {
      const opciones = {
      method:metodo,
      headers:{"Content-Type":"application/json"},
    }
    if(body) opciones.body = JSON.stringify(body)
    const response = await fetch(url,opciones)
    if(response.ok){
      const responseJson = response.json()
      setCart(responseJson.data)
    }else{
      toast.error("error al hacer la peticon:",metodo,url)
    }
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    if(user?.id){
      peticionesCart(urlapi+"/api/cart")
    }
  }, []);

  async function addProductToCart(product, quantity = 1) {
    await peticionesCart(urlapi+"/api/cart/add","POST",{idProducto:product._id,quantity})
  }

  async function deleteProduct(productId) {
    await peticionesCart(urlapi+"/api/cart/remove","POST",{idProducto:productId})
  }

  async function addOneProduct(productId) {
     await peticionesCart(urlapi+"/api/cart/add","POST",{idProducto:productId,quantity:1})
  }

  async function removeOneProduct(productId) {
    await peticionesCart(urlapi+"/api/cart/removeOne","POST",{idProducto:productId})
  }

  async function clearCart() {
    await peticionesCart(urlapi+"/api/cart/clear","POST")
  }

  function getTotal() {
    if(!cart || !cart.detalle) return 0
    return cart.detalle.reduce((total,item)=> total+(item.quantity*item.price),0).toFixed(2)
  }

  function getTotalItems() {
    if(!cart || !cart.detalle) return 0
    return cart.detalle.reduce((cantidadItems,item)=> cantidadItems+(item.quantity),0)
  }

  const value = {
    cart,
    addProductToCart,
    deleteProduct,
    addOneProduct,
    removeOneProduct,
    clearCart,
    getTotal,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
