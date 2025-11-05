import React from "react";
import "./styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      {/* 💌 Get in Touch Section */}
      <section className="contact-hero">
        {/* Left Column */}
        <div className="contact-info">
          <h2 className="section-title">Get in Touch</h2>
          <p className="intro-text">
            We’d love to hear from you! Whether you have questions about our handcrafted scented candles,
            need assistance placing an order, or want to collaborate, we’re just a message away.
            Our team is based in Bengaluru and always eager to help.
          </p>

          <div className="support-block">
            <h4>Support</h4>
            <a href="mailto:support@ujaasaroma.com" className="email-link">
              support@ujaasaroma.com
            </a>
          </div>

          <div className="divider"></div>

          <div className="location-block">
            <h2 className="section-title">Our Location</h2>
            <p className="intro-text">
              Situated in Bengaluru, India, Ujaas Aroma focuses on crafting artisanal scented candles that
              reflect your unique preferences and create comforting atmospheres.
            </p>

            <div className="location-details">
              <div>
                <h4>Address</h4>
                <p>Bellandur, Bengaluru, Karnataka, India</p>

                <h4>Hours</h4>
                <p>7 AM – 11 PM (Daily)</p>
              </div>

              <div>
                <h4>Contact</h4>
                <a href="mailto:support@ujaasaroma.com" className="email-link">
                  support@ujaasaroma.com
                </a>

                <h4>Open</h4>
                <p>Daily</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Contact Form */}
        <div className="contact-form">
          <form>
            <h3 className="form-title">Send Us a Message</h3>
            <p className="form-subtitle">
              Fill out the form below and our team will get back to you shortly.
            </p>

            <div className="form-group">
              <label>Your First Name</label>
              <input type="text" placeholder="Enter your first name" />
            </div>

            <div className="form-group">
              <label>Your Email Address*</label>
              <input type="email" placeholder="Enter your email address" required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="Enter your phone number" />
            </div>

            <div className="form-group">
              <label>Your Message*</label>
              <textarea placeholder="Type your message here" rows="4" required></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Submit Your Inquiry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
