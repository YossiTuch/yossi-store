const timeouts = new WeakMap();

export const cartSyncMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  const cartActions = [
    "cart/addToCart",
    "cart/removeFromCart",
    "cart/saveShippingAddress",
    "cart/savePaymentMethod",
    "cart/clearCartItems",
    "cart/mergeCarts",
  ];

  if (cartActions.includes(action.type)) {
    const state = store.getState();
    const { userInfo } = state.auth;
    
    if (userInfo) {
      let syncTimeout = timeouts.get(store);
      
      if (syncTimeout) {
        clearTimeout(syncTimeout);
      }
      
      syncTimeout = setTimeout(async () => {
        try {
          const { BASE_URL } = await import("../constants");
          const { cart } = store.getState();
          
          await fetch(`${BASE_URL}/api/users/cart`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ cart }),
          });
        } catch (error) {
        }
      }, 500);
      
      timeouts.set(store, syncTimeout);
    }
  }

  return result;
};
