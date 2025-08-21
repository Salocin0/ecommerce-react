import { useState } from "react";
import FormInput from "../components/formInput";
import { useNavigate } from "react-router-dom";
import { Lock, User, Mail, Calendar } from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    DNI: "",
    email: "",
    contrasenia: "",
    confirmarContrasenia: "",
    fechaNacimiento: "",
  });

  const navigate = useNavigate();

  function navigateToHome() {
    navigate("/");
  }

  function registerUser(e) {
    e.preventDefault();
    console.log(formData);
    //fetch al back para guardar los datos
  }

  return (
    <div className="flex flex-col justify-center bg-gray-700 min-h-screen items-center">
      <div className="bg-gray-900 rounded-2xl max-w-2xl">
        <div className="flex justify-center py-4">
          <h1 className="text-2xl font-bold text-emerald-400">Register</h1>
        </div>
        <form
          onSubmit={registerUser}
          className="space-y-5 flex flex-col justify-center"
        >
          <FormInput
            icon={<User size={18} />}
            labelText={"Nombre"}
            inputType={"text"}
            placeholder={"juan"}
            value={formData.nombre}
            onChangeFn={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
          />
          <FormInput
            icon={<User size={18} />}
            labelText={"Apellido"}
            inputType={"text"}
            placeholder={"Perez"}
            value={formData.apellido}
            onChangeFn={(e) =>
              setFormData({ ...formData, apellido: e.target.value })
            }
          />
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
          <FormInput
            icon={<User size={18} />}
            labelText={"Confirmar Contraseña"}
            inputType={"password"}
            placeholder={"admin123"}
            value={formData.confirmarContrasenia}
            onChangeFn={(e) =>
              setFormData({ ...formData, confirmarContrasenia: e.target.value })
            }
          />
          <FormInput
            icon={<Calendar size={18} />}
            labelText={"Fecha Nacimiento"}
            inputType={"Date"}
            placeholder={"10/01/2007"}
            value={formData.fechaNacimiento}
            onChangeFn={(e) =>
              setFormData({ ...formData, fechaNacimiento: e.target.value })
            }
          />
          <div className="flex flex-row justify-center py-5">
            <button
              onClick={() => navigateToHome()}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 mx-2 rounded-md flex items-center w-45"
            >
              Volver
            </button>
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 mx-2 rounded-md flex items-center w-45"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
