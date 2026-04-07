import React from "react";

const About = () => {
  return (
    <section className="about_section layout_padding">
      <div className="container">
        <div className="heading_container text-center mb-5">
          <h2>About <span>GT Enterprises</span></h2>
          <p className="section_subtitle">Crafting comfort, building homes.</p>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/assests/images/banner/hero-1.jpg" alt="Our Workshop" className="rounded-4 shadow" />
          </div>
          <div className="col-md-6">
            <div className="about_text ps-md-4 mt-4 mt-md-0">
              <h3>Our Legacy of Quality</h3>
              <p>
                Founded in 2010, GT Enterprises has been dedicated to providing premium quality furniture
                that combines modern aesthetics with timeless durability. We believe that every piece of
                furniture tells a story, and we're here to help you write yours.
              </p>
              <p>
                Our team of expert craftsmen uses only the finest materials, ensuring that every product
                meets our rigorous standards for excellence.
              </p>
              <ul className="list-unstyled mt-4">
                <li><i className="fa fa-heart text-danger me-2"></i> Handcrafted with Love</li>
                <li><i className="fa fa-check text-success me-2"></i> 1-Year Replacement Warranty</li>
                <li><i className="fa fa-truck text-primary me-2"></i> Free Global Shipping</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
