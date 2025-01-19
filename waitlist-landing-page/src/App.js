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
      const response = await fetch("https://script.google.com/macros/s/AKfycbxFKbISR-2atW_hHhSxcFQh-SKhCdRsug3QXgHd4TDHbHIpMOKxGUmx2y6Mzl2AF6wi/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();

      try{
        const result = JSON.parse(text);
        if(result.success) {
          setStatus({ success: true, message: result.message});
          setFormData({ name: "", email: "", interest: ""});
        } else {
          setStatus({ success: false, message: result.message});
          setFormData({ name: "", email: "", interest: ""});
        }
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        setStatus({ success: false, message: "Unexpected response from server."});
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setStatus({ success: false, message: "An error occurred. Please try again."})
    };
  }

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
          autoComplete="Yes"
          required
        />
        <textarea
          name="interest"
          placeholder="What interest you about the DalasToken?"
          value={formData.interest}
          onChange={handleChange}
          rows="3"
          required
        />
        <button type="submit">Join Waitlist</button>
      </form>
    </div>
  );
}

export default App;
