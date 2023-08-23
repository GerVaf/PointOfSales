"use client";
import React, { useEffect, useState } from "react";
import { del, post } from "@/app/Global/api/inventory";

function Brand() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    description: "",
    agent: "",
    phone_no: "",
    products: [],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      await post("/brand", formData).then((res) => {
        console.log(res);
      });
    } catch (error) {
      // Handle error, show an error message
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Post Data</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="agent"
          placeholder="Agent"
          value={formData.agent}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone_no"
          placeholder="Phone Number"
          value={formData.phone_no}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Brand;
