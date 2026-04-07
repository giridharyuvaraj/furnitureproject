import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="cart_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center mb-4">
          <h2>
            Your <span>Cart</span>
          </h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart_empty text-center py-5">
            <p className="text-muted mb-3">Your cart is empty.</p>
            <Link to="/shop" className="btn1">
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="cart_list">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} dispatch={dispatch} />
              ))}
            </div>

            <div className="cart_footer mt-4 pt-4 border-top d-flex flex-wrap justify-content-between align-items-center gap-3">
              <h4 className="mb-0">
                Total: <span className="text-danger">₹{totalPrice.toLocaleString("en-IN")}</span>
              </h4>
              <Link to="/checkout" className="btn1">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
