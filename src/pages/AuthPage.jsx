import Authorization from "../components/Authorization";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reveal from "../components/Reveal";

export default function AuthPage() {
    return (
        <>
            <Header />
            <Reveal><Authorization /></Reveal>
            <Reveal><Footer /></Reveal>
        </>
    )
}