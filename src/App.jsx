import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Categorys from "./pages/Categorys";
import Detalle from "./pages/Detalle";
import CartProvider from "./hooks/CartProvider";
import AuthProvider from "./hooks/AuthProvider";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  function login() {
    setIsLogin(true);
  }

  function loginAsAdmin() {
    login();
    setIsAdmin(true);
  }

  function logOut() {
    setIsAdmin(false);
    setIsLogin(false);
  }

  return (
    <>
      {/*otro elemento */}
      <AuthProvider>
        <CartProvider>
          <Navbar isLogin={isLogin} isAdmin={isAdmin} logOut={logOut} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login loginAsAdmin={loginAsAdmin} login={login} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category" element={<Categorys />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:id" element={<Detalle />} />
            <Route path="/*" element={<h1>404</h1>} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
