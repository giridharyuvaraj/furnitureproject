const testimonials = [
  {
    id: 1,
    name: "Priya",
    role: "Interior Designer",
    image: "/assests/images/users/user-1.jpg",
    rating: 5,
    text: "Excellent furniture quality and great service. The craftsmanship is outstanding and the delivery was faster than expected!",
  },
  {
    id: 2,
    name: "Vijay",
    role: "Home Owner",
    image: "/assests/images/users/user-2.jpg",
    rating: 5,
    text: "Beautiful designs and fast delivery. The quality exceeded my expectations. Highly recommend GT Enterprises for premium furniture.",
  },
  {
    id: 3,
    name: "Giri",
    role: "Architect",
    image: "/assests/images/users/user-3.jpg",
    rating: 5,
    text: "Amazing craftsmanship and premium feel. The attention to detail is remarkable. Will definitely buy again!",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonial_section">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            What Our <span>Customers Say</span>
          </h2>
          <p className="section_subtitle">
            Trusted by thousands of happy customers
          </p>
        </div>

        <div className="testimonial_grid">
          {testimonials.map((item) => (
            <div className="testimonial_card" key={item.id}>
              <div className="quote_icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
              </div>
              <p className="testimonial_text">{item.text}</p>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < item.rating ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </div>
              <div className="testimonial_author">
                <img src={item.image} alt={item.name} />
                <div className="author_info">
                  <h6>{item.name}</h6>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
