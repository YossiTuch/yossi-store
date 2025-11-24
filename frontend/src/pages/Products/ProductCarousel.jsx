import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    touchMove: true,
    touchThreshold: 5,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: true,
          swipe: true,
          touchMove: true,
          swipeToSlide: true,
        },
      },
    ],
  };

  return (
    <div className="mb-4 w-full px-1 sm:px-2 md:px-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message || "An error occurred"}
        </Message>
      ) : (
        <div className="mx-auto w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <div className="touch-pan-y">
            <Slider {...settings}>
              {products.map(
                ({
                  image,
                  _id,
                  name,
                  price,
                  description,
                  brand,
                  createdAt,
                  numReviews,
                  rating,
                  quantity,
                  countInStock,
                }) => (
                  <div key={_id} className="px-1 sm:px-2 md:px-4">
                    <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-slate-800 sm:rounded-xl">
                      <div className="relative w-full overflow-hidden">
                        <img
                          src={image}
                          alt={name}
                          className="h-[18rem] w-full object-cover sm:h-[20rem] md:h-[24rem] lg:h-[28rem] xl:h-[30rem]"
                        />
                      </div>

                      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                        <div className="mb-3 flex flex-col gap-3 sm:mb-4 sm:gap-4 md:mb-6 md:flex-row md:justify-between">
                          <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4">
                            <div>
                              <h2 className="mb-1 text-lg font-bold sm:mb-2 sm:text-xl md:text-2xl lg:text-3xl">
                                {name}
                              </h2>
                              <p className="text-xl font-semibold text-pink-600 sm:text-2xl md:text-3xl dark:text-amber-400">
                                ${price}
                              </p>
                            </div>
                            <p className="line-clamp-3 text-xs leading-relaxed text-gray-700 sm:text-sm md:line-clamp-4 md:text-base md:max-w-md dark:text-gray-300">
                              {description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                              <div className="flex flex-col items-start text-xs sm:flex-row sm:items-center sm:text-sm md:text-base">
                                <FaStore className="mb-1 mr-1 shrink-0 text-white sm:mb-0 sm:mr-2" />
                                <span className="font-medium">Brand:</span>
                                <span className="ml-1 sm:ml-2">{brand}</span>
                              </div>
                              <div className="flex flex-col items-start text-xs sm:flex-row sm:items-center sm:text-sm md:text-base">
                                <FaClock className="mb-1 mr-1 shrink-0 text-white sm:mb-0 sm:mr-2" />
                                <span className="font-medium">Added:</span>
                                <span className="ml-1 sm:ml-2">
                                  {moment(createdAt).fromNow()}
                                </span>
                              </div>
                              <div className="flex flex-col items-start text-xs sm:flex-row sm:items-center sm:text-sm md:text-base">
                                <FaStar className="mb-1 mr-1 shrink-0 text-white sm:mb-0 sm:mr-2" />
                                <span className="font-medium">Reviews:</span>
                                <span className="ml-1 sm:ml-2">{numReviews}</span>
                              </div>
                            </div>

                            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                              <div className="flex flex-col items-start text-xs sm:flex-row sm:items-center sm:text-sm md:text-base">
                                <FaStar className="mb-1 mr-1 shrink-0 text-white sm:mb-0 sm:mr-2" />
                                <span className="font-medium">Ratings:</span>
                                <span className="ml-1 sm:ml-2">{Math.round(rating)}</span>
                              </div>
                              <div className="flex flex-col items-start text-xs sm:flex-row sm:items-center sm:text-sm md:text-base">
                                <FaShoppingCart className="mb-1 mr-1 shrink-0 text-white sm:mb-0 sm:mr-2" />
                                <span className="font-medium">Quantity:</span>
                                <span className="ml-1 sm:ml-2">{quantity}</span>
                              </div>
                              <div className="flex flex-col items-start text-xs sm:flex-row sm:items-center sm:text-sm md:text-base">
                                <FaBox className="mb-1 mr-1 shrink-0 text-white sm:mb-0 sm:mr-2" />
                                <span className="font-medium">Stock:</span>
                                <span className="ml-1 sm:ml-2">{countInStock}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
