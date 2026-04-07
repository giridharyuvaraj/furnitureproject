import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/constants";


const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <section className="checkout_section layout_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="checkout_box">
              <h2 className="mb-4">Checkout</h2>

              {/* Order Summary */}
              <div className="order_summary mb-4">
                <h5>Order Summary</h5>
                <div className="summary_items">
                  {cartItems.map((item) => (
                    <div className="summary_item" key={item.id}>
                      <span className="item_name">
                        {item.name} x {item.quantity || 1}
                      </span>
                      <span className="item_price">
                        ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="summary_total">
                  <span>Total</span>
                  <span className="total_amount">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Section */}
              <div className="payment_section">
                <h5 className="mb-3">Payment Details</h5>
                <Elements stripe={stripePromise}>
                  <Payment amount={totalAmount} cartItems={cartItems} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
