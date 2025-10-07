import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  //access token
  const [accessToken, setAccessToken] = useState(null);
  //refresh token
  const [refreshToken, setRefreshToken] = useState(null);
  //datos del usuario
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const localAccessToken = localStorage.getItem("accessToken");
      const localRefreshToken = localStorage.getItem("refreshToken");
      const localUserToken = localStorage.getItem("user");

      if (localAccessToken && localRefreshToken) {
        setAccessToken(localAccessToken);
        setRefreshToken(localRefreshToken);
        if (localUserToken && localUserToken !== "undefined") {
          const user = JSON.parse(localUserToken);
          setUser(user);
        }
      }
    } catch (error) {
      console.log("error al cargar los datos: ", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const urlapi = import.meta.env.VITE_URL_BACK || "http://localhost:3000"; //https://vercel.miproyecto.com
      const response = await fetch(`${urlapi}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("error en el login");
      }

      const responseJson = await response.json();
      const accessToken = responseJson.data.accessToken;
      const refreshToken = responseJson.data.refreshToken;

      const userData = accessToken
        ? JSON.parse(atob(accessToken.split(".")[1]))
        : null;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(userData);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", userData);

      return { success: true, data: { accessToken, refreshToken } };
    } catch (error) {
      console.log("error en el login: ", error);
      return { success: false, data: error };
    }
  };

  const logout = async () => {
    //disco -> localstorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    //memoria -> ram
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) {
        throw new Error("no hay refresh token disponble");
      }
      const urlapi = import.meta.env.VITE_URL_BACK || "http://localhost:3000"; //https://vercel.miproyecto.com
      const response = await fetch(`${urlapi}/api/user/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-refresh-token": refreshToken
        },
      });
      if (!response.ok) {
        throw new Error("error al obtener el accesstoken");
      }

      const responseJson = await response.json();
      const accessToken = responseJson.data.accessToken;
      const refreshToken = responseJson.data.refreshToken

      const userData = accessToken
        ? JSON.parse(atob(accessToken.split(".")[1]))
        : null;

      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      setUser(userData)

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", userData);

      return responseJson.data
    } catch (error) {
        console.log("error al actualizar el token: ", error)
        logout()
        return null
    }
  };

  const value = {
    accessToken,
    refreshToken,
    user,
    isLoading,
    logout,
    login,
    refreshAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
