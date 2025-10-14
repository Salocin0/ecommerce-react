import { useNavigate } from "react-router-dom";
import FormInput from "./formInput";
import { useState } from "react";
import { PencilLine, DollarSign } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

function FormProducto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    id: "",
  });
  const { refreshAccessToken, logout,accessToken } = useAuth();

  function navigateToHome() {
    navigate(-1);
  }

  async function saveProduct(e) {
    e.preventDefault();

    const respuesta = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify({
        title: "ejemploDesdeWeb",
        price: 99,
        category:"man clothes"
      }),
      headers: {
        "Content-Type": "application/json",
        "authorization":accessToken
      },
    });
    //validar el resultado
    //si es 401 refrescar el token y volver a pedir
    console.log(respuesta)
    if (respuesta.status(401)) {
      toast.info("token expirado refrescando")
      await refreshAccessToken();

      const respuesta = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          title: "ejemploDesdeWeb",
          price: 99,
          category:"man clothes"
        }),
        headers: {
          "Content-Type": "application/json",
          "authorization":accessToken
        },
      });

      if (respuesta.status(401)) {
        toast.info("ambos tokens expirados")
        logout();
        navigate("/login");
      }
    }
    const data = await respuesta.json();
    console.log(data);
    toast.success("producto creado correctamente")
  }

  return (
    <form
      onSubmit={saveProduct}
      className="space-y-5 flex flex-col justify-center px-8 pb-8"
    >
      <FormInput
        icon={<PencilLine size={18} />}
        labelText={"Title"}
        inputType={"text"}
        placeholder={"Mens Casual Slim Fit"}
        value={formData.title}
        onChangeFn={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <FormInput
        icon={<PencilLine size={18} />}
        labelText={"Description"}
        inputType={"text"}
        placeholder={
          "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side ..."
        }
        value={formData.description}
        onChangeFn={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <FormInput
        icon={<DollarSign size={18} />}
        labelText={"Price"}
        inputType={"number"}
        placeholder={"19.99"}
        value={formData.price}
        onChangeFn={(e) => setFormData({ ...formData, price: e.target.value })}
      />

      <select
        name="category"
        id="category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="text-white"
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>

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
  );
}

export default FormProducto;
