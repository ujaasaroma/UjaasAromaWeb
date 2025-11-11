// src/pages/Accounts.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { logoutUser } from "../features/userSlice";
import {
  listenToUserProfile,
  updateUserProfile,
  clearProfile,
} from "../features/profileSlice";
import MyOrders from "./MyOrders";
import CustomerCare from "./CustomerCare";
import Wishlist from "./Wishlist";
import ShippingAddresses from "./shippingAddresses";
import "./styles/Accounts.css";
import "./styles/AccountSkeleton.css";

export default function Accounts() {
  const { user } = useSelector((state) => state.user);
  const { data: profile, status } = useSelector((s) => s.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [link, setLink] = useState("my-orders");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "" });
  const [newPhotoFile, setNewPhotoFile] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      dispatch(listenToUserProfile(user.uid));
    }
    return () => dispatch(clearProfile());
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const openEditModal = () => {
    setEditForm({
      name: profile.name || "",
      phone: profile.phone || "",
    });
    setPreviewPhoto(profile.photoURL || null);
    setShowEditModal(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhotoFile(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.uid) return;
    setSaving(true);
    try {
      await dispatch(
        updateUserProfile({
          uid: user.uid,
          name: editForm.name.trim(),
          phone: editForm.phone.trim(),
          newPhotoFile,
        })
      );
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || status === "idle") {
    return (
      <div className="profile-skeleton-container">
        <div className="profile-skeleton-card">
          <div className="skeleton skeleton-photo" />
          <div className="skeleton skeleton-name" />
          <div className="skeleton skeleton-email" />
          <div className="skeleton skeleton-phone" />
          <div className="skeleton skeleton-btn primary" />
          <div className="skeleton skeleton-btn secondary" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="profile-layout"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ---- Profile Card ---- */}
      <div className="profile-card">
        <div className="profile-section">
          <div className="profile-image-section">
            <img
              src={
                profile.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              }
              alt="Profile"
              className="profile-avatar"
            />
          </div>
          <div className="profile-details-section">
            <span className="profile-email">
              <i className="bi bi-person"></i>: {profile.name}
            </span>
            <span className="profile-email">
              <i className="bi bi-envelope"></i>: {profile.email}
            </span>
            {profile.phone && (
              <span className="profile-phone">
                <i className="bi bi-telephone"></i>: {profile.phone}
              </span>
            )}
          </div>
          <Button
            className="profile-edit-btn"
            variant="link"
            onClick={openEditModal}
          >
            <i className="bi bi-pencil"></i>
          </Button>
        </div>

        {/* ---- Sidebar Menu ---- */}
        <div className="profile-sidebar">
          <ul className="profile-menu">
            <li
              className={`menu-item ${link === "my-orders" && "active"}`}
              onClick={() => setLink("my-orders")}
            >
              <i className="bi bi-file-earmark-text"></i> My Orders
            </li>
            <li
              className={`menu-item ${link === "ccare" && "active"}`}
              onClick={() => setLink("ccare")}
            >
              <i className="bi bi-headset"></i> Customer Care
            </li>
            <li
              className={`menu-item ${link === "saddresses" && "active"}`}
              onClick={() => setLink("saddresses")}
            >
              <i className="bi bi-pin-map"></i> Addresses
            </li>
            <li
              className={`menu-item ${link === "wishlist" && "active"}`}
              onClick={() => setLink("wishlist")}
            >
              <i className="bi bi-heart"></i> Wishlist
            </li>
            <li className="menu-item logout" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </li>
          </ul>
        </div>
      </div>

      {/* ---- Dynamic Page ---- */}
      {link === "my-orders" ? (
        <MyOrders />
      ) : link === "ccare" ? (
        <CustomerCare />
      ) : link === "saddresses" ? (
        <ShippingAddresses />
      ) : link === "wishlist" ? (
        <Wishlist />
      ) : (
        ""
      )}

      {/* ---- Edit Profile Modal ---- */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="md"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex flex-column align-items-center mb-3">
              <Image
                src={
                  previewPhoto ||
                  profile.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                }
                roundedCircle
                width={150}
                className="mb-2 "
              />
              <Form.Label className="text-muted small">
                Change Profile Picture
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ maxWidth: 250 }}
              />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" disabled={saving} onClick={handleSaveProfile}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
}
