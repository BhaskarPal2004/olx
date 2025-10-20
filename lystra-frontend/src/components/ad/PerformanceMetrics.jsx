import views from "@/assets/performance/views.svg";
import clicks from "@/assets/performance/clicks.svg";
import messages from "@/assets/performance/messages.svg";
import earnings from "@/assets/performance/earnings.svg";
import MetricCard from "./MetricCard";
import { useEffect, useState } from "react";
import useAxiosInstance from "@/hooks/useAxiosInstance";

const PerformanceMetrics = ({ adId }) => {
  const [performanceData, setPerformanceData] = useState({
    views: 0,
    clicks: 0,
  });
  const { adsApi } = useAxiosInstance();

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await adsApi.get(`/getAnalytics/${adId}`);
        const { views, clicks } = response.data.performance;

        setPerformanceData((prev) => ({
          ...prev,
          views,
          clicks,
        }));
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    if (adId) {
      fetchPerformanceData();
    }
  }, [adId, adsApi]);

  const performanceMetricsData = [
    {
      title: "Views",
      value: performanceData.views,
      icon: views,
    },
    {
      title: "Clicks",
      value: performanceData.clicks,
      icon: clicks,
    },
    {
      title: "Messages",
      value: "0",
      icon: messages,
    },
    {
      title: "Earnings",
      value: "₹0",
      icon: earnings,
    },
  ];

  return (
    <>
      {performanceMetricsData.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </>
  );
};

export default PerformanceMetrics;
