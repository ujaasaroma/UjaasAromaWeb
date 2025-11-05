import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reveal from "../components/Reveal";
import ProductDetails from "../components/ProductDetails";

export default function ProductDetailsPage() {
    const { productId } = useParams();
    return (
        <>
            <Header />
            <Reveal><ProductDetails productId={productId} /></Reveal>
            <Reveal><Footer /></Reveal>
        </>
    )
}