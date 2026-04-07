import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const imgSrc =
    product.imageUrl ||
    product.image ||
    "/assests/images/products/sofa-1.jpg";

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="product_card">
        <div className="img_box">
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
          />
        </div>

        <div className="detail_box">
          <h5>{product.name}</h5>
          <h6>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </h6>
        </div>

        <div className="option_container">
          <div className="options">
            <Link
              to={`/product/${product.id}`}
              className="option1"
            >
              View Details
            </Link>

            <button
              className="option2"
              onClick={handleAddToCart}
              type="button"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
