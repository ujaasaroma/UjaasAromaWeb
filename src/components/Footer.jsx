import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import "./styles/Footer.css";

const logoUrl =
  "https://firebasestorage.googleapis.com/v0/b/ujaas-aroma.firebasestorage.app/o/logos%2Flogo-shadow.png?alt=media&token=14434b83-1c6b-4b1a-9df9-07745b330edd";

export default function Footer() {
  return (
    <footer
      className="text-light footer-container"
      style={{
        backgroundColor: "#000",
        fontFamily: '"Work Sans", sans-serif',
        paddingBottom: "10px",
      }}
    >
     
      {/* Footer Content */}
      <Container fluid className="mt-5 pt-5 d-flex flex-column" style={{ borderTop: '10px groove #eee' }}>
        <Row style={{ width: '65%', alignSelf: 'center' }}>
          {/* Contact Column */}
          <Col lg={3} md={6} className="mb-4">
            <h6
              className="mb-4"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "1.5px",
              }}
            >
              CONTACT
            </h6>
            <div style={{ fontSize: "13px", lineHeight: "1.8" }}>
              <p className="mb-2">A: Bengaluru, Karnataka, India</p>
              <p className="mb-2">T: +91 96855-58919</p>
              <p className="mb-2">E: support@ujaasaroma.com</p>
            </div>
          </Col>

          {/* Services Column */}
          <Col lg={3} md={6} className="mb-4">
            <h6
              className="mb-4"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "1.5px",
              }}
            >
              SERVICES
            </h6>
            <ul
              className="list-unstyled"
              style={{ fontSize: "13px", lineHeight: "2" }}
            >
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Exclusive offers
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Gifts
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Store location
                </a>
              </li>
              <li className="mb-0">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Corporate sales
                </a>
              </li>
            </ul>
          </Col>

          {/* Orders Column */}
          <Col lg={3} md={6} className="mb-4">
            <h6
              className="mb-4"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "1.5px",
              }}
            >
              ORDERS
            </h6>
            <ul
              className="list-unstyled"
              style={{ fontSize: "13px", lineHeight: "2" }}
            >
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  My account
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Delivery information
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Track my order
                </a>
              </li>
              <li className="mb-0">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Help
                </a>
              </li>
            </ul>
          </Col>

          {/* Most Popular Column */}
          <Col lg={3} md={6} className="mb-4">
            <h6
              className="mb-4"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "1.5px",
              }}
            >
              MOST POPULAR
            </h6>
            <ul
              className="list-unstyled"
              style={{ fontSize: "13px", lineHeight: "2" }}
            >
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Bergamot Collection
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Huile divine
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  La note de Paris
                </a>
              </li>
              <li className="mb-0">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Pachouli Home
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Newsletter Section */}
        <Row className="mt-5 pt-4">
          <Col lg={12}>
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ borderTop: "1px groove #333", borderBottom: "1px groove #333", paddingTop: "60px" }}
            >
              <h5
                className="mb-4"
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  letterSpacing: "3px",
                }}
              >
                FOLLOW US & SUBSCRIBE
              </h5>
              <Form className="d-flex justify-content-between align-items-center gap-3 mb-4" style={{
                borderBottom: "1px solid #fff", width: '25%'
              }}>
                <Form.Control
                  type="email"
                  placeholder="Enter your e-mail address here"
                  className="footer-subscription"
                  style={{
                    maxWidth: "400px",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "0",
                    color: "#fff",
                    fontSize: "13px",
                    padding: "10px 0",
                  }}
                />
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
                    padding: "10px 0"
                  }}
                >
                  SEND
                </Button>
              </Form>

              {/* Social Icons */}
              <div className="d-flex justify-content-center gap-4 mb-5">
                <a
                  href="#"
                  className="text-light"
                  style={{
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/ujaasaroma"
                  className="text-light"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com/@ujaasaroma"
                  className="text-light"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  className="text-light"
                  style={{
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Links and Copyright */}
        <Row className="mt-2 d-flex align-items-center justify-content-center">
          <Col lg={4} className="text-center text-lg-start mb-3 mb-lg-0">
            <div style={{ fontSize: "11px" }}>
              <a
                href="#"
                className="text-light text-decoration-none me-4"
                style={{ transition: "opacity 0.3s" }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="text-light text-decoration-none"
                style={{ transition: "opacity 0.3s" }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Privacy
              </a>
            </div>
          </Col>
          <Col lg={4} className="text-center text-lg-end">
            <p
              className="mb-0"
              style={{ fontSize: "11px", opacity: "0.7" }}
            >
              © 2025. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
