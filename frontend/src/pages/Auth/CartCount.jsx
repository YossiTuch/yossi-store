import { useSelector } from "react-redux";

const CartCount = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart?.cartItems || [];
  const totalItems = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);

  if (totalItems === 0) return null;

  return (
    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-600 px-1.5 text-xs font-bold text-white dark:bg-amber-600">
      {totalItems > 99 ? "99+" : totalItems}
    </span>
  );
};

export default CartCount;
