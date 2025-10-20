import AnalyticChart from "@/components/ad/AnalyticChart";
import PerformanceMetrics from "@/components/ad/PerformanceMetrics";
import { useParams } from "react-router-dom";

const AdPerformance = () => {
  const { adId } = useParams();

  if (!adId) return <p>Invalid Ad</p>;
  return (
    <>
      <div className="p-4 bg-white border border-[#EAEAEA] rounded-[10px] lg:px-6">
        <h3 className="text-[#0C0C0C] font-medium mb-4 lg:mb-8 lg:mt-[14px]">
          Ad Performance
        </h3>
        <section className="grid gap-4 s:grid-cols-2 md:grid-cols-4 mb-[38px]">
          <PerformanceMetrics adId={adId} />
        </section>

        <section className="mb-3">
          <AnalyticChart adId={adId} days={30} />
        </section>
      </div>
    </>
  );
};

export default AdPerformance;
