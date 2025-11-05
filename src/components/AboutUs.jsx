import React from "react";
import "./styles/AboutUs.css";
import { Link } from "react-router-dom";

const candleImage =
  "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1430,fit=crop/mnl4XxlxxBH1206z/whatsapp-image-2025-08-27-at-15.31.46_e02c6c13-YX4jO6Jwa9U6wRzN.jpg";

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-text">
          <h2>Welcome to</h2>
          <h1>Ujaas Aroma</h1>
          <p>
            Explore our lovingly handcrafted scented candles made in Bengaluru,
            India. We provide a wide range of shapes, sizes, and fragrances
            suitable for any occasion.
          </p>
          <Link to="/shop" className="primary-btn">Let's take a look at the products</Link>
        </div>

        <div className="about-hero-image">
          <div className="image-container">
            <img src={candleImage} alt="Scented candles" />
            <div className="stats-card">
              <div>
                <h3>150+</h3>
                <p>Customer already approved</p>
              </div>
              <div className="divider"></div>
              <div>
                <h3>15</h3>
                <p>Handmade wicks with love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="location-text">
          <h2>Location</h2>
          <p>
            Situated in Bengaluru, India, Ujaas Aroma focuses on crafting
            artisanal scented candles, addressing various customer tastes and
            custom requests.
          </p>

          <div className="location-details">
            <p>
              <strong>Ujaas Aroma</strong>
              <br />
              Bengaluru, Karnataka, India
            </p>
            <p>
              <strong>Working Hours</strong>
              <br />
              7 AM – 11 PM
            </p>
          </div>
        </div>

        <div className="location-map">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Bellandur,Bengaluru,India&z=14&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
