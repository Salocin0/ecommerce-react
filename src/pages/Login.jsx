import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/formInput";
import { User, Mail } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "", //admin@admin.com
    contrasenia: "", //admin
  });

  const {login,user}= useAuth()

  const navigate = useNavigate()

  async function loginUser(e) {
    e.preventDefault();

    const result = await login(formData.email,formData.contrasenia)

    if (result.success){
      toast.success("inicio de sesion exitoso")
      if(user.role=="admin"){
        navigate("/dashboard")
      }else{
        navigate("/")
      }
    }

  }

  function navigateToHome() {
    navigate(-1);
  }

  return (
    <div className="flex flex-col justify-center bg-gray-700 min-h-screen items-center pt-12">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full mx-4">
        <div className="flex justify-center py-4">
          <h1 className="text-2xl font-bold text-emerald-400">Login</h1>
        </div>
        <form
          onSubmit={loginUser}
          className="space-y-5 flex flex-col justify-center px-8 pb-8"
        >
          <FormInput
            icon={<Mail size={18} />}
            labelText={"Email"}
            inputType={"email"}
            placeholder={"ejemplo@gmail.com"}
            value={formData.email}
            onChangeFn={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <FormInput
            icon={<User size={18} />}
            labelText={"Contraseña"}
            inputType={"password"}
            placeholder={"admin123"}
            value={formData.contrasenia}
            onChangeFn={(e) =>
              setFormData({ ...formData, contrasenia: e.target.value })
            }
          />

          <div className="flex flex-row justify-center gap-4 pt-6">
            <button
              onClick={() => navigateToHome()}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md flex items-center justify-center flex-1 text-center"
            >
              Volver
            </button>
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-md flex items-center justify-center flex-1 text-center"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
