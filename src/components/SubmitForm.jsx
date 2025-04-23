import React, { useState } from "react";
import axios from "axios";

const SubmitForm = ({ fields, endpoint }) => {
  // Initial form state based on provided fields
  const [formData, setFormData] = useState(
    Object.fromEntries(
      fields.map((field) => [field.name, field.defaultValue || ""])
    )
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(endpoint, formData);
      alert(res.data.message || "Submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };
  return (
    <>
      <div>Submit</div>
    </>
  );
};

export default SubmitForm;
