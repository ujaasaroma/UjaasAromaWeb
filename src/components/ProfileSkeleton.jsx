import React from "react";
import "./styles/ProfileSkeleton.css";

export default function ProfileSkeleton() {
  return (
    <div className="profile-skeleton-container">
      {/* Left Profile Card */}
      <div className="profile-skeleton-card">
        <div className="skeleton skeleton-photo" />
        <div className="skeleton skeleton-name" />
        <div className="skeleton skeleton-email" />
        <div className="skeleton skeleton-phone" />

        <div className="skeleton skeleton-btn primary" />
        <div className="skeleton skeleton-btn secondary" />
      </div>

      {/* Right Orders Table */}
      <div className="profile-skeleton-orders">
        <div className="skeleton skeleton-title" />
        <div className="skeleton-tab-container">
          <div className="skeleton skeleton-tab" />
          <div className="skeleton skeleton-tab" />
          <div className="skeleton skeleton-tab" />
          <div className="skeleton skeleton-tab" />
        </div>

        {/* Table Placeholder */}
        <div className="skeleton-table">
          {[1, 2].map((row) => (
            <div key={row} className="skeleton-table-row">
              <div className="skeleton skeleton-col short" />
              <div className="skeleton skeleton-col medium" />
              <div className="skeleton skeleton-col short" />
              <div className="skeleton skeleton-col short" />
              <div className="skeleton skeleton-col short" />
              <div className="skeleton skeleton-col medium" />
              <div className="skeleton skeleton-col icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
