import ad from "@/assets/features/ad.svg";
import chat from "@/assets/features/chat.svg";
import earnings from "@/assets/features/earnings.svg";
import reviews from "@/assets/features/reviews.svg";
import performance from "@/assets/features/performance.svg";
import SectionHeading from "@/components/landing/SectionHeading";
import FeatureCard from "@/components/landing/seller/featured/FeatureCard";

const Features = () => {
  const featuredData = [
    {
      image: ad,
      title: "Ad Management",
      description: "Post, edit, and track your listings in real time.",
    },
    {
      image: chat,
      title: "Messages & Buyer Interaction",
      description: "Chat instantly with interested buyers.",
    },
    {
      image: earnings,
      title: "Earnings & Payments",
      description: "View your sales, track payments, and withdraw earnings.",
    },
    {
      image: reviews,
      title: "Reviews & Ratings",
      description:
        "Build trust with customer feedback and improve credibility.",
    },
    {
      image: performance,
      title: "Performance Insights",
      description:
        "Get detailed analytics on ad views, clicks, and conversions.",
    },
    {
      image: performance,
      title: "Performance Insights",
      description:
        "Get detailed analytics on ad views, clicks, and conversions.",
    },
  ];

  return (
    <>
      <SectionHeading text={"Key Features"} />
      <section className="w-[full] flex flex-wrap justify-center gap-5 px-4 2xl:px-0 mt-6 md:mt-10 lg:mt-14 xl:mt-16 2xl:mt-20 3xl:mt-24 4xl:mt-[104px] 4xl:gap-x-[30px] 4xl:gap-y-[26px] max-w-[1170px] mx-auto">
        {featuredData.map((feature, index) => (
          <FeatureCard
            key={index}
            image={feature.image}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </>
  );
};

export default Features;
