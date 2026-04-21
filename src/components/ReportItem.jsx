import { useState } from "react";
import api from "../api/axios";
import "../styles/report.css";

function ReportItem({ type }) {
  const [form, setForm] = useState({
    item: "",
    description: "",
    location: "",
    contactEmail: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];

      setForm({ ...form, image: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("item", form.item);
    data.append("description", form.description);
    data.append("location", form.location);

    if (form.image) {
      data.append("image", form.image);
    }

    if (type === "lost") {
      data.append("contactEmail", form.contactEmail);
    }

    const endpoint = type === "lost" ? "/lost/report" : "/found/report";

    try {
      const res = await api.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`${type} item reported successfully`);

      console.log(res.data);

      setForm({
        item: "",
        description: "",
        location: "",
        contactEmail: "",
        image: null,
      });

      setPreview(null);
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to report item");
    }
  };

  return (
    <div className="report-page">
      <div className="report-container">
        <h2 className="report-title">
          {type === "lost" ? "Report Lost Item" : "Report Found Item"}
        </h2>

        <form className="report-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="item"
            placeholder="Item Name"
            value={form.item}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          {type === "lost" && (
            <input
              type="email"
              name="contactEmail"
              placeholder="Contact Email"
              value={form.contactEmail}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          {preview && (
            <img src={preview} alt="preview" className="image-preview" />
          )}

          <button className="report-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ReportItem;
