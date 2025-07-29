import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

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
        <h2 className="text-4xl font-bold">Contact Us</h2>
        <p className="mt-4 text-lg">
          Let us know how we can help! We welcome your questions and feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-base-200 shadow-xl p-3 md:p-6 rounded-lg hover:shadow-lg hover:shadow-accent transition-shadow duration-300">
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
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-accent transition text-white font-semibold py-3 px-6 rounded"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col justify-start items-center bg-base-200 shadow-xl p-6 rounded-lg hover:shadow-lg hover:shadow-accent transition-shadow duration-300">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>

            {/* Phone */}
            <div className="flex items-center mb-4 p-3 rounded-md transition-all duration-300 ease-in-out group">
              <div className="shrink-0 min-w-[1.5rem] h-6 mr-4 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110">
                <FiPhone className="w-full h-full" />
              </div>
              <p className="text-lg">+880-1234-567890</p>
            </div>

            {/* Email */}
            <div className="flex items-center mb-4 p-3 rounded-md transition-all duration-300 ease-in-out group">
              <div className="shrink-0 min-w-[1.5rem] h-6 mr-4 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110">
                <FiMail className="w-full h-full" />
              </div>
              <p className="text-lg">support@redlife.com</p>
            </div>

            {/* Address */}
            <div className="flex items-center p-3 rounded-md transition-all duration-300 ease-in-out group">
              <div className="shrink-0 min-w-[1.5rem] h-6 mr-4 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110">
                <FiMapPin className="w-full h-full" />
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
