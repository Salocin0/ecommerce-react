import { useState, useEffect } from "react";

function useCategories() {
  const [categories, setcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiBaseUrl = import.meta.env.VITE_URL_BACK;
        const response = await fetch(`${apiBaseUrl}/api/category`);
        if (!response.ok) {
          throw new Error("Error en la peticion");
        }
        const responseJson = await response.json();
        setcategories(responseJson.data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { categories, isLoading, error };
}

export default useCategories;
