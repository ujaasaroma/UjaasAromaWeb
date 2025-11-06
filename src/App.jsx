// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import './App.css'
import ShopPage from './pages/ShopPage';
import AddProduct from './pages/AddProduct';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetailsPage from './pages/ProductsDetailsPage';
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/ShopPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
