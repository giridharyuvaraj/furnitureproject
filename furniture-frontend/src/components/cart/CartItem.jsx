import { increaseQty, decreaseQty, removeFromCart } from "../../redux/slices/cartSlice";

const CartItem = ({ item, dispatch }) => {
  const imgSrc = item.imageUrl || item.image || "/assests/images/products/sofa-1.jpg";
  const subtotal = item.price * item.quantity;

  return (
    <div className="cart_item">
      <div className="cart_item_img">
        <img src={imgSrc} alt={item.name} />
      </div>
      <div className="cart_item_detail flex-grow-1">
        <h5>{item.name}</h5>
        <p className="mb-1">₹{Number(item.price).toLocaleString("en-IN")} each</p>
        <div className="qty_controls d-flex align-items-center gap-2">
          <button
            type="button"
            className="qty_btn"
            onClick={() => dispatch(decreaseQty(item.id))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty_value">{item.quantity}</span>
          <button
            type="button"
            className="qty_btn"
            onClick={() => dispatch(increaseQty(item.id))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <div className="cart_item_actions text-end">
        <p className="fw-bold mb-2">₹{subtotal.toLocaleString("en-IN")}</p>
        <button
          type="button"
          className="btn_remove"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
