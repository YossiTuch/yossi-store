import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!cart.cartItems || cart.cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cart.cartItems, navigate]);

  return (
    <div className="min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <ProgressSteps step1 step2 />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md md:w-[40rem] md:max-w-none">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:p-6 dark:border-slate-700 dark:bg-slate-800">
              <h1 className="mb-6 text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">
                Shipping
              </h1>

              <form onSubmit={submitHandler} className="space-y-5">
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full rounded border border-slate-300 bg-white p-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                    placeholder="Enter address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full rounded border border-slate-300 bg-white p-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    className="w-full rounded border border-slate-300 bg-white p-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                    placeholder="Enter postal code"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="w-full rounded border border-slate-300 bg-white p-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                    placeholder="Enter country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payment Method
                  </label>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/50">
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 border-slate-300 text-pink-600 focus:ring-2 focus:ring-pink-500 dark:border-slate-600 dark:text-amber-500 dark:focus:ring-amber-500"
                        name="paymentMethod"
                        value="PayPal"
                        checked={paymentMethod === "PayPal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        PayPal or Credit Card
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  className="w-full rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none sm:py-3.5 sm:text-lg dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-500"
                  type="submit"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
