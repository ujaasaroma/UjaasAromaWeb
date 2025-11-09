import Footer from "../components/Footer";
import Header from "../components/Header";
import Reveal from "../components/Reveal";
import Contact from "../components/Contact";

export default function ContactPage() {
    return (
        <>
            <Header bg="linear-gradient(135deg, #fff, #f5f1f0)"/>
            <Reveal><Contact /></Reveal>
            <Reveal><Footer /></Reveal>
        </>
    )
}