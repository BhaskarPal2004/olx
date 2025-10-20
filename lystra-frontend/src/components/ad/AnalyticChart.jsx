import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import useAxiosInstance from "@/hooks/useAxiosInstance";

const verticalLinePlugin = {
  id: "crosshairLine",
  afterDraw: (chart) => {
    if (chart.tooltip?._active && chart.tooltip._active.length) {
      const ctx = chart.ctx;
      ctx.save();
      const activePoint = chart.tooltip._active[0];
      const x = activePoint.element.x;
      const topY = activePoint.element.y;
      const bottomY = chart.scales.y.bottom;

      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ED640F";
      ctx.stroke();
      ctx.restore();
    }
  },
};

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  verticalLinePlugin
);

const NoDataIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16 mb-4 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3v18h18M9 17V9m4 8V5m4 12v-4"
    />
  </svg>
);

const AnalyticChart = ({ adId, days }) => {
  const [chartDataFetched, setChartDataFetched] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { adsApi } = useAxiosInstance();
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      try {
        const res = await adsApi.get(`/getAdAnalytics/${adId}/${days}`);
        if (res.data && res.data.length > 0) {
          const formattedData = res.data.map((item) => ({
            date: item.date,
            value: item.views + item.clicks,
            views: item.views,
            clicks: item.clicks,
          }));

          setChartDataFetched({
            labels: formattedData.map((item) => item.date),
            datasets: [
              {
                label: "Total views and clicks",
                data: formattedData.map((item) => item.value),
                borderColor: "#ED640F",
                backgroundColor: (context) => {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) {
                    const fallback = ctx.createLinearGradient(0, 0, 0, 500);
                    fallback.addColorStop(0, "#ED640F");
                    fallback.addColorStop(1, "rgba(237,100,15,0)");
                    return fallback;
                  }
                  const gradient = ctx.createLinearGradient(
                    0,
                    chartArea.top,
                    0,
                    chartArea.bottom
                  );
                  gradient.addColorStop(0, "#ED640F");
                  gradient.addColorStop(1, "rgba(237,100,15,0)");
                  return gradient;
                },
                borderWidth: 3,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: "#ED640F",
                views: formattedData.map((item) => item.views),
                clicks: formattedData.map((item) => item.clicks),
              },
            ],
          });
        } else {
          setChartDataFetched(null);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setChartDataFetched(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (adId && days) {
      fetchChartData();
    }
  }, [adsApi, adId, days]);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#000000",
        bodyColor: "#0C0C0C",
        borderColor: "#E0E0E0",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const index = tooltipItem.dataIndex;
            const views = dataset.views[index];
            const clicks = dataset.clicks[index];
            const formatter = new Intl.NumberFormat("en", {
              notation: "compact",
              compactDisplay: "short",
            });
            return [
              `${formatter.format(views)} Views`,
              `${formatter.format(clicks)} Clicks`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          callback(value) {
            const rawDate = this.getLabelForValue(value);
            const date = new Date(rawDate);
            const day = date.toLocaleDateString("en-US", { weekday: "short" });
            const dayNum = date.getDate();
            return [`${day}`, `${dayNum}`];
          },
          font: { size: 14, weight: "500", family: "Archivo" },
          color: "#0C0C0C",
        },
      },
      y: {
        ticks: {
          callback: (value) =>
            new Intl.NumberFormat("en", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value),
          font: { family: "Archivo", size: 12 },
          color: "#828282",
        },
        grid: { display: false },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full h-[300px] rounded-md bg-gray-100 animate-pulse" />
    );
  }

  if (!chartDataFetched) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center px-4 text-gray-600">
        <NoDataIcon />
        <p className="text-xl font-semibold mb-2">No performance data yet</p>
        <p className="text-sm max-w-xs">
          Your ad hasn&apos;t received any views or clicks in the last {days}{" "}
          days. Try boosting your ad or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Line
        ref={chartRef}
        data={chartDataFetched}
        options={options}
        key={`${adId}-${days}`}
      />
    </div>
  );
};

export default AnalyticChart;
