import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="slider_section">
      <div className="slider_bg_box">
        <img
          src="/assests/images/banner/hero-1.jpg"
          alt="Furniture Banner"
        />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-7 col-lg-6">
            <div className="detail-box">
              <h1>
                <span>Sale 20% Off</span>
                <br />
                On Everything
              </h1>

              <p>
                Discover premium quality furniture crafted for comfort,
                durability, and elegance. Perfect for every home.
              </p>

              <div className="btn-box">
                <Link to="/shop" className="btn1">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
