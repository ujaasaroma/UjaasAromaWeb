import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reveal from "../components/Reveal";
import ProductDetails from "../components/ProductDetails";
import Toast from 'react-bootstrap/Toast';
import { useState } from "react";

export default function ProductDetailsPage() {
    const { productId } = useParams();
    const [added, setAdded] = useState(false);
    const [removed, setRemoved] = useState(false);

    return (
        <>
            <Header bg="linear-gradient(135deg, #fff, #f5f1f0)" />
            <Reveal><ProductDetails productId={productId} shopCartAdded={setAdded} shopCartRemoved={setRemoved} /></Reveal>
            <Reveal><Footer /></Reveal>
            <Toast bg='success' show={added} onClose={() => setAdded(!added)} style={{ position: 'fixed', bottom: 20, right: 20 }}>
                <Toast.Header>
                    <strong className="me-auto">Added to Cart</strong>
                </Toast.Header>
                <Toast.Body style={{ color: 'white' }}>Successfully added to cart.</Toast.Body>
            </Toast>
            <Toast bg='danger' show={removed} onClose={() => setRemoved(!removed)} style={{ position: 'fixed', bottom: 20, right: 20 }}>
                <Toast.Header>
                    <strong className="me-auto">Removed from Cart</strong>
                </Toast.Header>
                <Toast.Body style={{ color: 'white' }}>Successfully removed from cart.</Toast.Body>
            </Toast>
        </>
    )
}