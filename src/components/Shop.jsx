import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import {
  startProductsListener,
  stopProductsListener,
  setSortOption,
  selectSortedProducts,
} from "../features/productsSlice";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import "./styles/Shop.css";

export default function Shop() {
  const dispatch = useDispatch();
  const { loading, error, sortOption } = useSelector((state) => state.products);
  const products = useSelector(selectSortedProducts);

  useEffect(() => {
    dispatch(startProductsListener());
    return () => stopProductsListener();
  }, [dispatch]);

  const handleSortChange = (option) => dispatch(setSortOption(option));

  if (error)
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  return (
    <Row className="p-0 m-0 flex-column justify-content-center align-items-center shop-row">
      <Col className="products-sorting">
        <span className="me-2">Sort by:</span>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            className="border-0 shadow-none bg-white"
          >
            {sortOption === "lowToHigh"
              ? "Price: Low to High"
              : sortOption === "highToLow"
              ? "Price: High to Low"
              : sortOption === "newest"
              ? "Newest"
              : "Default"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSortChange("default")}>
              Default
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("lowToHigh")}>
              Price: Low to High
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("highToLow")}>
              Price: High to Low
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("newest")}>
              Newest
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col>
        <Row className="m-0 shop-display-row">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Col key={i} className="shop-product-col">
                  <ProductCardSkeleton />
                </Col>
              ))
            : products.map((product) => (
                <Col key={product.id} className="shop-product-col">
                  <div className="product-card">
                    <div className="product-img-wrapper">
                      <Image
                        src={product.images?.[0]}
                        alt={product.title}
                        className="image-hover"
                      />
                      {product.ribbon && (
                        <span className="product-tag">{product.ribbon}</span>
                      )}
                    </div>
                    <div className="product-info">
                      <p className="product-name fw-bold">{product.title}</p>
                      <p className="product-price">
                        {product.discountPrice ? (
                          <>
                            <span className="old-price me-2">
                              ₹{product.price.toFixed(2)}
                            </span>
                            <span className="new-price fw-bold text-success">
                              ₹{product.discountPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="new-price fw-bold">
                            ₹{product.price.toFixed(2)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
        </Row>
      </Col>
    </Row>
  );
}
