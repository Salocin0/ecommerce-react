
import AuthButtons from "./AuthButtons";
import CartButton from "./CartButton";
import DashboardButton from "./DashboardButton";
function Navbar({isLogin,isAdmin,logOut,cartItem}) {
  //logo/nombre
  //navegacion
  //carrito

  return (
    <div className="bg-gray-900 flex items-center flex-wrap gap-4">
        <CartButton cartItem={cartItem} isLogin={isLogin}/>
      <DashboardButton isAdmin={isAdmin}/>
      <AuthButtons isLogin={isLogin} logOut={logOut}/>
    </div>
  );
}

export default Navbar;
