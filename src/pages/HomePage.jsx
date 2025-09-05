import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image'; // ✅ You forgot to import this
import logo from '../assets/images/logo.png';

export default function HomePage() {
    return (
        <Container fluid>
            <div className="fixed-top">
                <Row>
                    <Col className="text-white p-2 text-center text-uppercase top-tab">
                        Enjoy special discounts on our candles!
                    </Col>
                </Row>
                <Row>
                    <Col className="text-black text-center">
                        <Image src={logo} rounded className="logo-small" />
                    </Col>
                    <Col>
                        <Nav className="d-flex align-items-center justify-content-center p-4" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link href="/home">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Shop</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2">About</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="disabled">
                                    Contact
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
