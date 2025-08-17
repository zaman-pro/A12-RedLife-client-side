import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    toast.success("Your message has been sent!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-base-100 my-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold"></h2>
        <p className="mt-4 text-lg"></p>
      </div>

      <SectionHeader
        title="Contact Us"
        subtitle="Let us know how we can help! We welcome your questions and feedback."
      />

      <div className="flex justify-between gap-8 flex-col md:flex-row">
        {/* Contact Form */}
        <div className="p-3 md:p-6 md:w-1/2">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Write to Us
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-secondary/30 rounded px-4 py-3 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-secondary/30 rounded px-4 py-3 focus:outline-none"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-secondary/30 rounded px-4 py-3 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-accent transition text-white font-semibold py-3 px-6 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
        {/* divider */}
        <div className="divider divider-horizontal divider-secondary hidden md:flex"></div>

        {/* Contact Information */}
        <div className="flex flex-col items-center p-6 md:w-1/2">
          <div>
            <h3 className="text-2xl text-center font-semibold mb-6">
              Connect With Us
            </h3>

            {/* Phone */}
            <div className="flex items-center p-3 transition-all duration-300 ease-in-out group">
              <div className="shrink-0 min-w-[1.5rem] h-6 mr-4 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110">
                <FiPhone className="w-full h-full text-secondary" />
              </div>
              <p className="text-lg">+880-1234-567890</p>
            </div>

            {/* Email */}
            <div className="flex items-center p-3 transition-all duration-300 ease-in-out group">
              <div className="shrink-0 min-w-[1.5rem] h-6 mr-4 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110">
                <FiMail className="w-full h-full text-secondary" />
              </div>
              <p className="text-lg">support@redlife.com</p>
            </div>

            {/* Address */}
            <div className="flex items-center p-3 transition-all duration-300 ease-in-out group">
              <div className="shrink-0 min-w-[1.5rem] h-6 mr-4 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110">
                <FiMapPin className="w-full h-full text-secondary" />
              </div>
              <p className="text-lg">
                123 Donation Lane, Bogura,
                <br />
                Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
