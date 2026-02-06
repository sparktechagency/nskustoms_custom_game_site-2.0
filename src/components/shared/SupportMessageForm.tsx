"use client";

import { useState } from "react";
import { usePostSupportMessageMutation } from "@/src/redux/features/settings/settingApi";
import { toast } from "sonner";
import { MessageSquare, Send, Loader2, HelpCircle } from "lucide-react";

interface SupportMessageFormProps {
  title?: string;
  subtitle?: string;
}

const SupportMessageForm = ({
  title = "Contact Support",
  subtitle = "Have a question or need help? Send us a message and we'll get back to you as soon as possible.",
}: SupportMessageFormProps) => {
  const [createSupportMessage, { isLoading }] = usePostSupportMessageMutation();

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await createSupportMessage(formData).unwrap();
      if (res.code === 201) {
        setFormData({ subject: "", message: "" });
        toast.success("Support message sent successfully!");
      }
    } catch (err) {
      console.error("Failed to send support message:", err);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-6 h-6 text-red-500" />
        <h1 className="text-white text-2xl font-semibold">{title}</h1>
      </div>

      {/* Main Card */}
      <div className="bg-[#282836] backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <MessageSquare className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-white font-medium">Send a Message</h2>
              <p className="text-gray-400 text-sm">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What do you need help with?"
              className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 transition-all"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Describe your issue or question in detail..."
              className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 resize-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>

        {/* Help Info */}
        <div className="px-6 pb-6">
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
            <h3 className="text-gray-300 text-sm font-medium mb-2">
              Need immediate assistance?
            </h3>
            <p className="text-gray-500 text-sm">
              Our support team typically responds within 24 hours. For urgent
              matters, please include &quot;URGENT&quot; in your subject line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportMessageForm;
