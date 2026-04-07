import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductById } from "../../services/productService";
import { addToCart } from "../../redux/slices/cartSlice";
import Loader from "../common/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err?.response?.data?.message || "Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      navigate("/cart");
    }
  };

  if (loading) return <Loader />;
  if (error || !product) {
    return (
      <section className="product_detail_section layout_padding">
        <div className="container">
          <h2>Product Not Found</h2>
          <p>{error}</p>
          <button className="btn1" type="button" onClick={() => navigate("/shop")}>
            Back to Shop
          </button>
        </div>
      </section>
    );
  }

  const imgSrc = product.imageUrl || product.image || "/assests/images/products/sofa-1.jpg";

  return (
    <section className="product_detail_section layout_padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="product_detail_img_box">
              <img src={imgSrc} alt={product.name} />
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="product_detail_title">{product.name}</h2>
            <h4 className="product_detail_price">₹{Number(product.price).toLocaleString("en-IN")}</h4>
            <p className="product_detail_desc">{product.description}</p>
            <p className="text-muted small">In stock: {product.stock}</p>
            <div className="btn-box mt-4">
              <button className="btn1" type="button" onClick={handleAddToCart}>
                Add To Cart
              </button>
              <button className="btn1 btn_outline" type="button" onClick={() => navigate("/shop")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
