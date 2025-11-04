import Footer from "../components/Footer";
import Header from "../components/Header";
import Shop from "../components/Shop";
import Reveal from "../components/Reveal";
import AboutUs from "../components/AboutUs";

export default function AboutPage() {
    return (
        <>
            <Header />
            <Reveal><AboutUs /></Reveal>
            <Reveal><Footer /></Reveal>
        </>
    )
}