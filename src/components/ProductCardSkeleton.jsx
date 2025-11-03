import "./styles/ProductCardSkeleton.css";

export default function ProductCardSkeleton() {
  return (
    <div className="product-card shimmer-card">
      <div className="shimmer-img"></div>
      <div className="shimmer-line short"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line tiny"></div>
    </div>
  );
}
