import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3>{user.name}</h3>

        <span className={user.isActive ? "status active" : "status inactive"}>
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="user-card-body">
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Membership:</strong> {user.membershipType}
        </p>

        {user.category && (
          <p>
            <strong>Category:</strong> {user.category}
          </p>
        )}

        {user.expiryDate && (
          <p>
            <strong>Expiry Date:</strong> {user.expiryDate}
          </p>
        )}
      </div>

      <div className="user-card-footer">
        <button className="btn-primary">
          View Details
        </button>

        <button className="btn-secondary">
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserCard;