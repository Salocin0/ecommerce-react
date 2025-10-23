import { useState, useEffect, useCallback } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const { user, accessToken, refreshAccessToken } = useAuth()
  const urlapi = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const peticionesCart = useCallback(async (url, metodo = "GET", body = null, retryCount = 0) => {
    try {
      const opciones = {
        method: metodo,
        headers: { "Content-Type": "application/json", "Authorization": `${accessToken}` },
      }
      if (body) opciones.body = JSON.stringify(body)
      const response = await fetch(url, opciones)

      if (response.status === 401 && retryCount === 0) {
        const refreshResult = await refreshAccessToken()
        if (refreshResult?.success) {
          return peticionesCart(url, metodo, body, retryCount + 1)
        } else {
          toast.error("Sesión expirada, por favor inicia sesión nuevamente")
          return
        }
      }

      if (response.ok) {
        const responseJson = await response.json()
        setCart(responseJson.data)
      } else {
        toast.error(`Error al hacer la petición: ${metodo} ${url}`)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error de conexión")
    }
  }, [accessToken, refreshAccessToken]);

  const getTotal = useCallback(() => {
    if(!cart || !cart.detalle) return "0.00"
    return cart.detalle.reduce((total,item)=> total+(item.quantity*item.price),0).toFixed(2)
  }, [cart]);

  useEffect(() => {
    if(user?.id){
      peticionesCart(urlapi+"/api/cart")
    } else {
      // Limpiar carrito cuando no hay usuario logueado
      setCart(null)
    }
  }, [user?.id, peticionesCart, urlapi]);

  async function addProductToCart(product, quantity = 1) {
    const productId = product._id || product.id
    if (!productId) {
      toast.error("Producto inválido")
      return
    }
    await peticionesCart(urlapi+"/api/cart/add","POST",{idProducto: productId, quantity})
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
