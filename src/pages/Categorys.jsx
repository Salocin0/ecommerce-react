import manClothes from "../assets/manClothesC.jpg";
import womenClothes from "../assets/womenClothesC.jpg";
import electronic from "../assets/electronicC.jpg";
import jewelery from "../assets/jeweleryC.jpg";
import CategoryItem from "../components/CategoryItem";
function Categorys() {
  const categories = [
    {
      href: "/men's clothing",
      name: "men's clothing",
      img: manClothes,
    },
    {
      href: "/women's clothing",
      name: "women's clothing",
      img: womenClothes,
    },
    {
      href: "/electronics",
      name: "electronics",
      img: electronic,
    },
    {
      href: "/jewelery",
      name: "jewelery",
      img: jewelery,
    },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gray-700 pt-16 ">
      <div className="relative z-10 mx-auto max-w-7xl mb-8">
        <h1 className="text-emerald-400 text-center text-5xl font-bold mb-4"> Categories</h1>
        <p className="text-center text-xl text-gray-300 mb-12">Discover the latest trends</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categorys;
