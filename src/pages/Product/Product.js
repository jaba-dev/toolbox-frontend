import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import styles from "./product.module.css";
import ProductAccordion from "./ProductAccordion";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import useFetch from "../../components/Hooks/useFetch";
import RootLayout from "../../components/Layouts/RootLayout";
import Spinner from "../../components/Spinner/Spinner";

function Product() {
  const { initialState, setInitialState, baseURL, cart, setCart } =
    useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { data, loading, error } = useFetch(`${baseURL}/api/products`, {});
  const addToCart = (articleNumber) => {
    const existingItem = cart.find(
      (item) => item.articleNumber === articleNumber
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.articleNumber === articleNumber
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { articleNumber, quantity: 1 }]);
    }
  };

  useEffect(() => {
    // if (loading) {
    //   console.log(loading);
    // }
    if (data) {
      const product = data.find((item) => {
        return item._id === id;
      });
      setProduct(product);
    }
    // if (error) {
    //   console.log(error);
    // }
  }, [data, loading, error]);
  if (loading) {
    return (
      <RootLayout>
        <Spinner />
      </RootLayout>
    );
  }
  if (product) {
    return (
      <RootLayout>
        <Breadcrumbs productName={product.name} />
        <div>
          <div
            onClick={() => {
              setInitialState(!initialState);
            }}
            className={styles.product}
          >
            <div className={styles.productImage}>
              <img src={product.imageURL} alt={product.name} />
            </div>
            <div className={styles.productDetails}>
              <div className={styles.productPrice}>{product.price}</div>
              <h1>{product.name}</h1>
              <div className={styles.articleNumber}>
                Artnr. {product.articleNumber}
              </div>
              <div className={styles.addToCart}>
                <button onClick={() => addToCart(product.articleNumber)}>
                  add to cart
                </button>
              </div>
            </div>
          </div>
          <ProductAccordion
            description={product.description}
            specifications={product.specifications}
            initialState={initialState}
          />
        </div>
      </RootLayout>
    );
  }
}

export default Product;
