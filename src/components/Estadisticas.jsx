import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ReactECharts from "echarts-for-react";
function Estadisticas() {
  const { accessToken } = useAuth();
  const urlback = import.meta.env.VITE_URL_BACK || "http://localhost:3000";

  const hoy = new Date();
  const fechaInicio = new Date();
  fechaInicio.setDate(hoy.getDate() - 7);

  const [desde, setDesde] = useState(fechaInicio);
  const [hasta, setHasta] = useState(hoy);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  const getOptions = () => {
    if (!estadisticas) {
      return {};
    } else {
      return {
        xAxis: {
          type: "category",
          data: estadisticas.fechas,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: estadisticas.totales,
            type: "line",
            smooth: true,
          },
        ],
      };
    }
  };

  const getOptionsPie = () => {
    if (!estadisticas) {
      return {};
    } else {
      return {
        title: {
          text: "ventas por categoria",
          subtext: "ventas",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: estadisticas.productosvendidosxcategoria,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    }
  };

  const fetchEstadisticas = async () => {
    try {
      const response = await fetch(`${urlback}/api/pedidos/estadisticas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          fechaDesde: desde,
          fechaHasta: hasta,
        }),
      });

      if (response.ok) {
        const respuesta = await response.json();
        setEstadisticas(respuesta.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchEstadisticas();
    }
  }, []);
  if (!loading) {
    return (
      <ReactECharts
        option={getOptionsPie()}
        style={{ height: "400px", width: "400px" }}
        theme="dark"
      />
    );
  } else {
    <div className="text-white">cargando grafico...</div>;
  }
}

export default Estadisticas;
