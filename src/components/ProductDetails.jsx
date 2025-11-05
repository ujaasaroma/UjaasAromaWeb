import React, { useEffect, useState } from "react";
import { getApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./styles/ProductDetails.css";

export default function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const app = getApp();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct(data);
          setSelectedImage(data.images?.[0]);
        } else {
          console.error("❌ No such product!");
        }
      } catch (error) {
        console.error("🔥 Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (loading)
    return <div className="loading">Loading product details...</div>;

  if (!product)
    return <div className="not-found">Product not found.</div>;

  return (
    <div className="product-page">
      {/* Left: Image Gallery */}
      <div className="gallery">
        <div className="thumbnails">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={selectedImage} alt={product.title} />
          {product.ribbon && (
            <span className="ribbon">{product.ribbon}</span>
          )}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="details">
        <h1 className="title">{product.title}</h1>
        <h3 className="subtitle">{product.subtitle}</h3>
        <p className="price">${product.price || product.options?.[0]?.price}</p>

        <div className="description">
          <p>
            {product.description ||
              "This beautifully handcrafted candle adds warmth and charm to any space. Perfect for gifts or home decor."}
          </p>
        </div>

        <div className="quantity-controls">
          <button onClick={decreaseQty}>−</button>
          <span>{quantity}</span>
          <button onClick={increaseQty}>＋</button>
          <button className="add-cart">ADD TO CART</button>
        </div>

        <button className="wishlist">♡ ADD TO WISHLIST</button>

        <div className="meta">
          {product.SKU && (
            <p>
              <strong>SKU:</strong> {product.SKU}
            </p>
          )}
          {product.weight && (
            <p>
              <strong>Weight:</strong> {product.weight} g
            </p>
          )}
          {product.options && (
            <div className="options">
              {product.options.map((opt, idx) => (
                <p key={idx}>
                  <strong>{opt.name}:</strong> {opt.value}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs">
        <div className="tab-headers">
          <span className="active">DESCRIPTION</span>
          <span>ADDITIONAL INFORMATION</span>
          <span>REVIEWS (1)</span>
        </div>
        <div className="tab-body">
          <p>
            {product.description?.trim()
              ? product.description
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras non purus et urna facilisis cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae."}
          </p>
        </div>
      </div>
    </div>
  );
}
