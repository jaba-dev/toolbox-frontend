import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import styles from "./cartitems.module.css";
import { ReactComponent as XMark } from "../../assets/icons/xmark.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

function CartItemsEl({ cartItemsExpanded, setCartItemsExpanded }) {
  const {
    baseURL,
    cartUpdate,
    setCartUpdate,
    setTotalQuantity,
    cart,
    setCart,
    setDeleteCart,
    isLoggingOut,
  } = useContext(AppContext);

  const [cartItems, setCartItems] = useState(cart);

  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const { data, loading, error } = useFetch(`${baseURL}/api/products`, {});
  const incrementQuantity = (articleNumber) => {
    setCartUpdate(!cartUpdate);
    setCart(
      cart.map((item) =>
        item.articleNumber === articleNumber
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (articleNumber) => {
    setCartUpdate(!cartUpdate);
    setCart(
      cart.map((item) =>
        item.articleNumber === articleNumber && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteFromCart = (articleNumber) => {
    setCartUpdate(!cartUpdate);
    setCart(cart.filter((item) => item.articleNumber !== articleNumber));
  };

  const removeCart = () => {
    setDeleteCart(true);
    setCart([]);
  };

  useEffect(() => {
    if (isLoggingOut === true) {
      setCartItems([]);
      setCart([]);
    }
    // if (loading) {
    //   console.log(loading);
    // }
    if (data) {
      const currentItems = [];
      cart.forEach((item) => {
        const product = data.find(
          (value) => value.articleNumber === item.articleNumber
        );
        currentItems.push({ ...product, quantity: item.quantity });
        setCartItems(currentItems);
      });
    }
    // if (error) {
    //   console.log(error);
    // }
  }, [cart, data, loading, error, isLoggingOut]);

  useEffect(() => {
    setTotalQuantity(
      cartItems.reduce((acc, next) => {
        return acc + next.quantity;
      }, 0)
    );
    const total = cartItems.reduce((acc, next) => {
      return acc + Number(next.price) * next.quantity;
    }, 0);
    setTotalCartPrice(total.toFixed(2));
  }, [cartItems]);

  return (
    <div
      className={`${styles.cartItems} ${
        cartItemsExpanded && styles.cartItemsExpanded
      }`}
      onClick={() => setCartItemsExpanded(!cartItemsExpanded)}
    >
      <div
        className={styles.cartItemscontent}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className={styles.closeBtn}
          onClick={() => setCartItemsExpanded(!cartItemsExpanded)}
        >
          <span>CLOSE</span>
          <XMark />
        </button>

        <h2 className={styles.mainHeading}>your cart</h2>
        <div>
          {cartItems.map((item) => {
            const totalProductPrice = item.price * item.quantity;

            return (
              <div key={item.articleNumber} className={styles.cartItem}>
                <div className={styles.cartItemLeft}>
                  <div className={styles.cartItemImage}>
                    <img src={item.imageURL} alt="" />
                  </div>
                  <div>
                    <h2 className={styles.cartItemTitle}>
                      <Link>{item.name}</Link>
                    </h2>
                    <div>{item.articleNumber}</div>
                    <div className={styles.cartItemPrice}>
                      Per price {item.price}
                    </div>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        deleteFromCart(item.articleNumber);
                        setCartItems((prevState) => {
                          return prevState.filter(
                            (val) => val.articleNumber !== item.articleNumber
                          );
                        });
                      }}
                    >
                      <TrashIcon />
                      Delete
                    </button>
                  </div>
                </div>
                <div className={styles.cartItemRight}>
                  <div className={styles.cartItemQuantityTop}>
                    <span>{totalProductPrice.toFixed(2)}</span>
                  </div>
                  <div className={styles.itemQuantityBottom}>
                    <button
                      onClick={() => {
                        decrementQuantity(item.articleNumber);
                        const updatedItem = cart.find(
                          (val) => val.articleNumber === item.articleNumber
                        );

                        setCartItems((prevState) => {
                          return prevState.map((prod) => {
                            if (
                              prod.articleNumber ===
                                updatedItem.articleNumber &&
                              prod.quantity > 1
                            ) {
                              return {
                                ...prod,
                                quantity: updatedItem.quantity - 1,
                              };
                            }
                            return prod;
                          });
                        });
                      }}
                    >
                      -
                    </button>
                    <input type="text" value={item.quantity} readOnly />
                    <button
                      onClick={() => {
                        incrementQuantity(item.articleNumber);
                        const updatedItem = cart.find(
                          (val) => val.articleNumber === item.articleNumber
                        );

                        setCartItems((prevState) => {
                          return prevState.map((prod) => {
                            if (
                              prod.articleNumber === updatedItem.articleNumber
                            ) {
                              return {
                                ...prod,
                                quantity: updatedItem.quantity + 1,
                              };
                            }
                            return prod;
                          });
                        });
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {cartItems.length > 0 ? (
          <div className={styles.cartItemsFooter}>
            <button
              onClick={() => {
                removeCart();
                setCartItems([]);
              }}
            >
              <TrashIcon />
              <span>CLEAR CART</span>
            </button>
            <div>
              <span>Total</span>
              <span>{totalCartPrice}</span>
            </div>
          </div>
        ) : (
          <p className={styles.cartInfo}>Your cart is empty</p>
        )}
      </div>
    </div>
  );
}

export default CartItemsEl;
