import React, { useState } from "react";
import "./App.css";

function App() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });

  // State for form status and error messages
  const [status, setStatus] = useState({ success: null, message: ""});

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before sending
    if(!formData.name || !formData.email) {
      setStatus({ success: false, message: "Name and Email are required."});
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)) {
      setStatus({ success: false, message: "Invalid email formart."});
      return;
    }

    // Submit form data to backend
    try {
      const response = await fetch("1DgTwOfIw4NAL_PZtp1YcsKfVVn3u2tz4503dDYhSlar-iQhmUm8bGaHz", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if(result.success) {
        setStatus({ success: true, message: result.message});
        setFormData({ name: "", email: "", interest: ""}); // Resets the form
      } else {
        setStatus({ success: false, message: result.message});
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({ success: false, message: "An error occured. Please try again."});
    }
  };

  return (
    <div className="App">
      <h1> Join the waitlist for DalasToken</h1>
      <p>Be the first to know about our updates and benefits!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="interest"
          placeholder="What interest you about the DalasToken?"
          value={formData.interest}
          onChange={handleChange}
          rows="3"
        />
        <button type="submit">Join Waitlist</button>
      </form>
      {status.message && (
        <p style={{color: status.success ? "green" : "red"}}>{status.message}</p>
      )}
    </div>
  );
}

export default App;
