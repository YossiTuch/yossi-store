import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1>ERROR</h1>;
  }
  return (
    <div className="container mx-auto min-h-[calc(100vh-200px)] px-2 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
      <div className="flex flex-col gap-4 sm:gap-6 xl:flex-row xl:justify-around xl:gap-8">
        <div className="w-full xl:flex-1 xl:max-w-md">
          <div className="xl:hidden">
            <h2 className="mb-3 text-lg font-bold sm:text-xl md:text-2xl">
              Featured Products
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:gap-4">
              {data.map((product) => (
                <div key={product._id} className="min-w-[160px] flex-shrink-0 sm:min-w-[180px]">
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="grid grid-cols-2 gap-4">
              {data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full xl:flex-1 xl:max-w-5xl">
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;
