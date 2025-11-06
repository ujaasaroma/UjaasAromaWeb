// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getApp } from "firebase/app";
import { logoutUser } from "../features/userSlice";
import "./styles/ProfilePage.css";
import { Button, Spinner } from "react-bootstrap";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const db = getFirestore(getApp());

  const [profile, setProfile] = useState({ name: "", email: "" });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch user profile and orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.uid) return;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setProfile({ name: data.name, email: data.email });
        }

        // Fetch orders
        const ordersRef = collection(db, "successOrders");
        const q = query(ordersRef, where("customerInfo.uid", "==", user.uid));
        const orderSnap = await getDocs(q);
        const orderList = orderSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setOrders(orderList);
      } catch (err) {
        console.error("Error fetching profile/orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleUpdate = async () => {
    if (!profile.name.trim()) return alert("Name cannot be empty");
    try {
      setUpdating(true);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name: profile.name });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <Spinner animation="border" variant="warning" />
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="profile-container shimmer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="profile-card">
        <h2 className="title">👤 My Profile</h2>
        <p className="subtitle">Manage your information and view your orders</p>

        <div className="profile-form">
          <label>Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <label>Email Address</label>
          <input type="email" value={profile.email} disabled />

          <Button
            variant="dark"
            onClick={handleUpdate}
            disabled={updating}
            className="mt-3"
          >
            {updating ? "Saving..." : "Save Changes"}
          </Button>

          <Button variant="outline-danger" onClick={handleLogout} className="mt-3">
            Logout
          </Button>
        </div>

        <div className="orders-section">
          <h3 className="orders-title">🧾 My Orders</h3>
          {orders.length === 0 ? (
            <p className="no-orders">No orders yet.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <p>
                    <strong>Order ID:</strong> {order.orderNumber || order.id}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.totalAmount?.toFixed(2) || "—"}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status || "Processing"}
                  </p>
                  {order.createdAt?.seconds && (
                    <small>
                      {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                    </small>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
