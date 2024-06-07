import React, { useState } from "react";
import axios from "axios";
import CustomButton from "../utils/CustomButton";

interface FormData {
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5173/send", formData);
      setStatus("Message sent successfully!");
      setFormData({ email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <section className="min-h-[88vh] relative">
      <div className="min-w-[200px] w-[40%] min-h-[200px] flex flex-col mx-auto my-10 p-5 border rounded-lg shadow-md absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <h1 className="text-2xl font-bold mb-5 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
              required
              autoComplete="off"
            />
          </div>
          <CustomButton
            type="submit"
            className="w-[120px] mx-auto text-center text-sm bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            title="Send Message
            "
          />
        </form>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </section>
  );
};

export default Contact;
