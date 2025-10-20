import electronics from "@/assets/category/electronics.png";
import vehicles from "@/assets/category/vehicles.png";
import real_estate from "@/assets/category/real_estate.png";
import furniture from "@/assets/category/furniture.png";
import services from "@/assets/category/services.png";
import fashion from "@/assets/category/fashion.png";
import CategoryCard from "@/components/landing/buyer/category/CategoryCard";

const categories = [
  { name: "Electronics", image: electronics },
  { name: "Vehicles", image: vehicles },
  { name: "Real Estate", image: real_estate },
  { name: "Home & Furniture", image: furniture },
  { name: "Jobs & Services", image: services },
  { name: "Fashion & Beauty", image: fashion },
];

const Category = () => {
  return (
    <div>
      <h3 className="text-xl font-medium text-center text-[#0C0C0C] mt-10 md:mt-14 lg:mt-16 xl:mt-20 2xl:mt-24 3xl:mt-28 4xl:mt-[130px]">
        Popular Categories
      </h3>
      <section className="flex flex-wrap justify-center mt-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            imageSrc={category.image}
            name={category.name}
          />
        ))}
      </section>
    </div>
  );
};

export default Category;
