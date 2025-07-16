import React, { useState, useEffect } from "react";
import "./EditProfile.css";

const EditProfile = ({ onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [preview, setPreview] = useState(user?.profilePicture || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return user.profilePicture;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("public_id", `profiles/${user._id}-${Date.now()}`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await handleUpload();

      const updated = {
        name,
        email,
        profilePicture: imageUrl,
      };

      const res = await fetch(`http://localhost:7000/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updated),
      });

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      onClose(); // ✅ Close modal after success
      window.location.reload(); // Optional: refresh avatar on dashboard
    } catch (err) {
      console.error("Profile update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="edit-overlay">
      <div className="edit-card">
        <button className="close-btn" onClick={onClose}>×</button>

        {preview && (
          <img
            src={preview}
            alt="Profile"
            className="profile-image"
          />
        )}

        <h2 style={{ textAlign: "center" }}>
          Hey <span>{name}</span>!
        </h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input value={email} disabled />

          <label>Change Profile Picture</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="profile-update"
          />

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: "1rem" }}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
