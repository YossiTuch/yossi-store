import { Link, useParams } from "react-router";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Message from "../components/Message";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <div className="min-h-[calc(100vh-100px)]">
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="container mx-auto mt-8 flex flex-col items-center justify-between gap-4 px-4 pb-8 sm:mt-12 sm:flex-row sm:px-6 sm:pb-12 md:mt-16 md:pb-16 lg:px-8">
            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="rounded-full bg-amber-600 px-6 py-2 text-sm font-bold transition-colors hover:bg-pink-700 sm:px-8 sm:py-3 sm:text-base dark:text-white"
            >
              Shop
            </Link>
          </div>
          <div className="m-auto mt-[2rem] flex w-10/12 flex-wrap justify-center max-md:w-[95%]">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
