"use client"
import { useState } from "react";
import { usePostSupportMessageMutation } from "@/src/redux/features/settings/settingApi";
import { message } from "antd";

const Page = () => {
  const [createSupportMessage, { isLoading, isSuccess, }] = usePostSupportMessageMutation();
  
  const [formData, setFormData] = useState({
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
     const res = await createSupportMessage(formData).unwrap();
      // Reset form on success
      if(res.code === 201){
        setFormData({ subject: "", message: "" });
       message.success("Support message sent successfully!");
      }
    } catch (err) {
      console.error("Failed to send support message:", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Issue with order"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="I have a problem with my recent order..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#c7cfcd52] text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>

        {isSuccess && (
          <p className="text-green-600 text-sm">Message sent successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Page;