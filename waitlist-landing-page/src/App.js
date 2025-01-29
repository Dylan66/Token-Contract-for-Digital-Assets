import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });

  const [status, setStatus] = useState({ success: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ success: null, message: "" });

    if (!formData.name || !formData.email) {
      setStatus({ success: false, message: "Name and Email are required" });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ success: false, message: "Please enter a valid email" });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({ 
        success: true, 
        message: "Thank you! You've been added to the waitlist" 
      });
      setFormData({ name: "", email: "", interest: "" });
    } catch (error) {
      setStatus({ 
        success: false, 
        message: "Submission failed. Please try again" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Join Dalas Token Waitlist</h1>
          <p className="subtitle">
            Secure early access to innovative financial solutions
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <textarea
              name="interest"
              placeholder="What interests you about DalasToken?"
              value={formData.interest}
              onChange={handleChange}
              rows="4"
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit" 
            className="cta-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Join Waitlist →"}
          </button>

          {status.message && (
            <div className={`status ${status.success ? "success" : "error"}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;