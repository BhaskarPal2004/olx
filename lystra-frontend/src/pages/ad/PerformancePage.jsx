import AdPerformance from "@/layouts/Ad/AdPerformance";
import AuthNavbar from "@/layouts/shared/AuthNavbar";

const PerformancePage = () => {
  return (
    <>
      <div className="font-archivo">
        <AuthNavbar />
        <section className="p-4 md:py-8 md:px-5 2xl:p-16 4xl:p-20 max-w-[1170px] mx-auto">
          <AdPerformance />
        </section>
      </div>
    </>
  );
};

export default PerformancePage;
