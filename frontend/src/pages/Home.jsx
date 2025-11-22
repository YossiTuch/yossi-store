import { Link, useParams } from "react-router";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Message from "../components/Message";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="mt-[10rem] ml-[20rem] text-[3rem]">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="mt-[10rem] mr-[18rem] rounded-full bg-pink-600 px-10 py-2 font-bold"
            ></Link>
          </div>
        </>
      )}
    </>
  );
};
export default Home;
