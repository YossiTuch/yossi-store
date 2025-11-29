import { useSelector } from "react-redux";

const CartCount = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart?.cartItems || [];
  const totalItems = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);

  return (
    <>
      {totalItems > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-600 rounded-full dark:bg-amber-600">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </>
  );
};

export default CartCount;
