"use client";

import { useState, useEffect, type FormEvent } from "react";
import Header from "@/src/components/Landing/Header";
import Footer from "@/src/components/Landing/Footer";
import AOS from "aos";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
  };

  return (
    <div className="min-h-screen dark:bg-black">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#282836] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            data-aos="fade-up"
          >
            Contact us
          </h1>
          <p
            className="text-gray-400 text-lg max-w-xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Contact us today to find out how we can help you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-[#1e1e2c] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left - Contact Info */}
            <div
              className="flex flex-col justify-center space-y-8"
              data-aos="fade-right"
            >
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-[#282836] p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white text-lg font-semibold">
                    978-238-9925
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-[#282836] p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white text-lg font-semibold">
                    tg@auraboost.gg
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="bg-[#282836] p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Working Hours</p>
                  <p className="text-white text-lg font-semibold">8am - 8pm</p>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div
              className="bg-[#282836] rounded-2xl p-8"
              data-aos="fade-left"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Fill up the form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1e1e2c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1e1e2c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full bg-[#1e1e2c] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors placeholder-gray-500 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
