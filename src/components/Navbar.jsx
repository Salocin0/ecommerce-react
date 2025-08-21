import AuthButtons from "./AuthButtons";
import CartButton from "./CartButton";
import DashboardButton from "./DashboardButton";
import NavbarBase from "./NavbarBase";
import Icon from "./Icon";
function Navbar({ isLogin, isAdmin, logOut, cartItem }) {
  //logo/nombre
  //navegacion

  return (
    <div className="bg-gray-900 w-full flex items-center gap-4">
      <div className="bg-gray-900 w-full flex items-center justify-start gap-4 py-2 px-2">
        <Icon />
      </div>
      <div className="bg-gray-900 w-full flex items-center justify-end gap-4 py-2 px-2">
        <NavbarBase />
        <CartButton cartItem={cartItem} isLogin={isLogin} />
        <DashboardButton isAdmin={isAdmin} />
        <AuthButtons isLogin={isLogin} logOut={logOut} />
      </div>
    </div>
  );
}

export default Navbar;
