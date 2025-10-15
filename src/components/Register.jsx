import React, { useState } from "react";
import API from "../api";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("api/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      if (res.status === 201) {
        setMessage(
          "Registration successful! Please check your email to verify your account before logging in."
        );
      }
    } catch (err) {
      console.error("Register error response:", err.response?.data);
      setError(
        JSON.stringify(err.response?.data) || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-card flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Register</h2>

        {message && <p className="alert alert-success text-center">{message}</p>}
        {error && <p className="alert alert-error text-center">{error}</p>}

        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        <label>First Name (optional)</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />

        <label>Last Name (optional)</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
