const features = [
  {
    id: 1,
    icon: "/assets/icons/delivery.png",
    title: "Fast Delivery",
    description: "Quick and safe delivery to your doorstep",
  },
  {
    id: 2,
    icon: "/assets/icons/shipping.png",
    title: "Free Shipping",
    description: "No hidden charges on orders",
  },
  {
    id: 3,
    icon: "/assets/icons/quality.png",
    title: "Best Quality",
    description: "Premium materials & craftsmanship",
  },
  {
    id: 4,
    icon: "/assets/icons/payment.png",
    title: "Secure Payment",
    description: "100% secure payment gateway",
  },
];

const WhyShopWithUs = () => {
  return (
    <section className="why_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            Why Shop <span>With Us</span>
          </h2>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-lg-3 col-md-6" key={feature.id}>
              <div className="why_box">
                <div className="why_icon">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    title={feature.title}
                    loading="lazy"
                  />
                </div>
                <div className="why_detail">
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyShopWithUs;
