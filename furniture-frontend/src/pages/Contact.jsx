import React from "react";

const Contact = () => {
  return (
    <section className="contact_section layout_padding">
      <div className="container">
        <div className="heading_container text-center mb-5">
          <h2>Contact <span>Us</span></h2>
          <p className="section_subtitle">Need a specialized piece? Let's talk.</p>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div
      className="contact_info pe-md-4"
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}
    >
      <h4 style={{ fontWeight: "600", marginBottom: "20px" }}>
        Get in Touch
      </h4>

      {/* Email */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <i className="bi bi-envelope-fill" style={{ color: "#e63946", fontSize: "18px", marginRight: "10px" }}></i>
        <a
          href="mailto:giridharyuvaraj07@gmail.com"
          style={{ color: "#333", textDecoration: "none" }}
        >
          giridharyuvaraj07@gmail.com
        </a>
      </div>

      {/* Phone */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <i className="bi bi-telephone-fill" style={{ color: "#e63946", fontSize: "18px", marginRight: "10px" }}></i>
        <a
          href="tel:+919342666147"
          style={{ color: "#333", textDecoration: "none" }}
        >
          +91 9342666147
        </a>
      </div>

      {/* Address */}
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "20px" }}>
        <i className="bi bi-geo-alt-fill" style={{ color: "#e63946", fontSize: "18px", marginRight: "10px", marginTop: "4px" }}></i>
        <span style={{ color: "#555" }}>
          Gugai, Salem South, Tamil Nadu, India
        </span>
      </div>

      {/* Office Hours */}
      <div style={{ marginTop: "25px" }}>
        <h5 style={{ fontWeight: "600", marginBottom: "10px" }}>
          <i className="bi bi-clock-fill" style={{ color: "#e63946", marginRight: "8px" }}></i>
          Our Office Hours
        </h5>

        <p style={{ margin: "0" }}>Monday - Friday: 9am to 6pm</p>
        <p style={{ margin: "0" }}>Saturday: 10am to 4pm</p>
      </div>
            </div>
          </div>
          <div className="col-md-7">
             <div className="contact_form rounded-4 shadow-sm p-4 bg-light border border-2 border-white">
                <form>
                  <div className="mb-3">
                    <label className="form-label font-weight-bold">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-weight-bold">Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter your email" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-weight-bold">Message</label>
                    <textarea className="form-control" rows="5" placeholder="Tell us what you're looking for..."></textarea>
                  </div>
                  <button type="submit" className="btn1 w-100 mt-3">Send Inquiry</button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
