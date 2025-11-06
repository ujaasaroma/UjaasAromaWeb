import { useState } from "react";
import { Image, Offcanvas } from "react-bootstrap";
import { IoHeartOutline, IoBagOutline, IoSearch, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./styles/Header.css";

const logoUrl =
    "https://firebasestorage.googleapis.com/v0/b/ujaas-aroma.firebasestorage.app/o/logos%2Flogo2.png?alt=media&token=192d3c40-2147-4053-b692-30db63606a9a";

export default function Header() {
    const [showCart, setShowCart] = useState(false);
    const handleClose = () => setShowCart(false);
    const handleShow = () => setShowCart(true);

    return (
        <header className="ujaas-header">
            {/* 🔹 Top Black Bar */}
            <div className="top-bar">
                <div className="top-bar-content">
                    <span className="email">support@ujaasaroma.com</span>
                    <span className="promo">free shipping on orders over &#8377; 2500</span>
                    <Link to='/profile' className="account">My Account <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg></Link>
                </div>
            </div>

            {/* 🔹 Main Navbar */}
            <div className="main-navbar m-0 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center justify-content-end column-gap-5 nav-left">
                    <Link to="/" className="nav-link-custom">HOME</Link>
                    <Link to="/shop" className="nav-link-custom">SHOP</Link>
                    <Link to="/about" className="nav-link-custom">ABOUT US</Link>
                    <Link to="/contact" className="nav-link-custom">Contact</Link>
                </div>

                {/* Center Logo */}
                <div className="main-logo-class d-flex justify-content-center align-items-center">
                    <Link to="/">
                        <Image src={logoUrl} alt="Ujaas Aroma" className="main-logo" />
                    </Link>
                </div>

                {/* Right-side Icons */}
                <div className="d-flex align-items-center justify-content-center column-gap-3 nav-icons">
                    <span><IoHeartOutline className="icon" title="Wishlist" /><small>(0)</small></span>
                    <span><IoBagOutline className="icon" title="Cart" onClick={handleShow} /><small>(0)</small></span>
                    <span><IoSearch className="icon" title="Search" /></span>
                    <span><IoMenu className="icon" title="Menu" /></span>
                </div>
            </div>

            {/* 🛍 Offcanvas Cart */}
            <Offcanvas show={showCart} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Bag</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>Your bag is empty 🛒</p>
                </Offcanvas.Body>
            </Offcanvas>
        </header>
    );
}
