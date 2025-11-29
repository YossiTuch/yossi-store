import { Link } from "react-router";
import {
  AiOutlineShopping,
  AiOutlineSafety,
  AiOutlineCustomerService,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaShippingFast, FaShieldAlt } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <AiOutlineShopping className="text-4xl" />,
      title: "Wide Selection",
      description: "Browse through our extensive catalog of quality products",
    },
    {
      icon: <FaShippingFast className="text-4xl" />,
      title: "Fast Shipping",
      description: "Quick and reliable delivery to your doorstep",
    },
    {
      icon: <AiOutlineSafety className="text-4xl" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing with PayPal",
    },
    {
      icon: <AiOutlineCustomerService className="text-4xl" />,
      title: "24/7 Support",
      description: "Our customer service team is always here to help",
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Quality Guarantee",
      description: "We stand behind the quality of every product we sell",
    },
    {
      icon: <AiOutlineHeart className="text-4xl" />,
      title: "Customer First",
      description: "Your satisfaction is our top priority",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            About YossiStore
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Your trusted online shopping destination
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-16">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Welcome to YossiStore
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                YossiStore is a modern e-commerce platform designed to provide
                you with an exceptional shopping experience. We offer a wide
                range of high-quality products, competitive prices, and
                outstanding customer service.
              </p>

              <h2 className="mt-8 text-2xl font-semibold text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Our mission is to make online shopping simple, enjoyable, and
                accessible to everyone. We strive to provide the best products
                at the best prices while maintaining the highest standards of
                customer service and satisfaction.
              </p>

              <h2 className="mt-8 text-2xl font-semibold text-gray-900 dark:text-white">
                What We Offer
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                At YossiStore, you can browse through our extensive product
                catalog, read detailed product descriptions and reviews, add
                items to your favorites, and complete secure purchases with ease.
                Our platform is designed with your convenience in mind.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Why Choose YossiStore?
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="mb-4 flex justify-center text-pink-600 dark:text-amber-400">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="rounded-xl bg-gradient-to-r from-pink-50 to-amber-50 p-8 dark:from-slate-800 dark:to-slate-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ready to Start Shopping?
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Explore our wide selection of products and find exactly what
                you're looking for.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-block rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-700 dark:bg-amber-600 dark:hover:bg-amber-700"
              >
                Visit Our Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
