import { useState, useEffect } from "react";

const useLocalStorageOrDatabase = (
  key,
  initialValue,
  isLoggedIn,
  token,
  userId,
  baseURL,
  cartUpdate,
  deleteCart,
  isLoggingOut,
  isLoggingIn,
  logout
) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    const saveCartToBackend = async () => {
      try {
        if (isLoggingIn && isLoggedIn) {
          const response = await fetch(`${baseURL}/api/users/merge-carts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: userId,
              cartItems: cartItems,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            setCartItems(data.updatedUser.cart);
            localStorage.setItem(key, JSON.stringify([]));
          } else {
            logout();
          }
        } else if (isLoggedIn) {
          if (deleteCart) {
            const response = await fetch(`${baseURL}/api/users/update-cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userId: userId,
                cartItems: [],
              }),
            });
            if (response.ok) {
              const data = await response.json();
              setCartItems(data.updatedUser.cart);
            } else {
              logout();
            }
          }
          if (cartItems.length > 0) {
            localStorage.setItem(key, JSON.stringify([]));
            const response = await fetch(`${baseURL}/api/users/update-cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userId: userId,
                cartItems: cartItems,
              }),
            });
            if (response.ok) {
              const data = await response.json();
              setCartItems(data.updatedUser.cart);
            } else {
              logout();
            }
          }
        } else if (isLoggingOut === true) {
          localStorage.setItem(key, JSON.stringify([]));
        } else {
          localStorage.setItem(key, JSON.stringify(cartItems));
        }
      } catch (error) {}
    };

    saveCartToBackend();
  }, [key, isLoggedIn, cartUpdate, deleteCart]);

  return [cartItems, setCartItems];
};

export default useLocalStorageOrDatabase;
