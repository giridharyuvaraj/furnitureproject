
const NewArrivals = () => {
  return (
    <section className="arrival_section">
      <div className="container">
        <div className="arrival_wrapper">
          <div className="arrival_content">
            <h5 className="tag">Trending Now</h5>
            <h2>Elegance for Every Corner</h2>
            <p>
              Experience the perfect blend of luxury and comfort with our latest collection. 
              Designed for the modern home, built to last a lifetime.
            </p>
            <div className="arrival_features">
              <div className="feature_item">
                <span className="check_icon">✓</span> Premium Quality
              </div>
              <div className="feature_item">
                <span className="check_icon">✓</span> Ergonomic Design
              </div>
              <div className="feature_item">
                <span className="check_icon">✓</span> Sustainably Sourced
              </div>
            </div>
            <a href="/shop" className="btn1 mt-4">Discover Collection</a>
          </div>

          <div className="arrival_image_box">
             <div className="image_overlay"></div>
             <img src="/assests/images/banner/new-arrivals.png" alt="Furniture Collection" />
          </div>
        </div>
      </div>
    </section>

  );
};

export default NewArrivals;
