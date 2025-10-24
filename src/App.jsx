import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Categorys from "./pages/Categorys";
import Detalle from "./pages/Detalle";
import CartProvider from "./hooks/CartProvider";
import AuthProvider from "./hooks/AuthProvider";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            {/*rutas sin auth*/}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category" element={<Categorys />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:id" element={<Detalle />} />
            <Route path="/*" element={<h1>404</h1>} />
            {/*rutas para el admin*/}
            <Route path="/dashboard" element={<ProtectedRoute requereAdmin={true}><Dashboard /></ProtectedRoute>} />
            {/*rutas para el user*/}
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            {/*rutas para el vendedor*/}
            
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
