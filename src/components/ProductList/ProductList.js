import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ShoppingCart } from "../../assets/icons/cart.svg";
import "./productlist.css";
import { AppContext } from "../../App";

function ProductList({
  currentProducts,
  addToCart,
  setCartUpdate,
  cartUpdate,
}) {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <div
      className="products"
      onClick={() => {
        setInitialState(!initialState);
      }}
    >
      {currentProducts.map((item) => {
        return (
          <div className="product" key={item._id}>
            <div className="product-image-div">
              <Link to={`${item._id}`}>
                {" "}
                <img src={item.imageURL} alt={item.name} width="150" />
              </Link>
            </div>
            <div className="product-details">
              <div className="price">price: {item.price}</div>
              <Link to={`${item._id}`} className="name">
                {item.name}
              </Link>
              <p className="brand">{item.brand}</p>
              <div className="articleNum">Art. {item.articleNumber}</div>
              <button
                className="addBtn"
                onClick={() => {
                  addToCart(item.articleNumber);
                  setCartUpdate(!cartUpdate);
                }}
              >
                <ShoppingCart />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
