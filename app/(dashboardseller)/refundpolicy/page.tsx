/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import support from '@/src/Assets/seller/support.png'
import Image from 'next/image';
import { useSetRefundsMutation } from '@/src/redux/features/become-seller/becomeSellerApi';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormData {
  orderId: string;
  email: string;
  reason: string;
}

const Page = () => {
     const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  console.log(orderId);

  const [formData, setFormData] = useState<FormData>({
    orderId: orderId ? orderId : '',
    email: '',
    reason: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];
      if (validTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File',
          text: 'Please upload a valid file format (JPEG, PNG, MP4, MOV)',
          confirmButtonColor: '#dc2626',
          background: '#1f1f1f',
          color: '#fff'
        });
      }
    }
  };

  const [setRefunds] = useSetRefundsMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create FormData object
    const formDataToSend = new FormData();
    
    // Append form fields
    formDataToSend.append('orderId', formData.orderId);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('reasonForRefund', formData.reason);
    
    // Append file if selected
    if (selectedFile) {
      formDataToSend.append('images', selectedFile);
    }
    
    try {
    
      // Call your mutation with FormData
      const res = await setRefunds(formDataToSend).unwrap();
      console.log('Response:', res);
      
      // Check if response code is 200
      if (res.code === 201) {
        // navigate hobe id dynami this  ite hobe 
        // /boosting/698167e7e81b5f7a0fcc2b11
       router.push(`/boosting/${orderId}`);

        // Reset form after successful submission
        setFormData({
          orderId: '',
          email: '',
          reason: ''
        });
        setSelectedFile(null);
        
        // Reset file input
        const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Show success message - dynamic from response
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: res.message || 'Refund request submitted successfully!',
          confirmButtonColor: '#dc2626',
          background: '#1f1f1f',
          color: '#fff'
        });
      } 
      
    } catch (error: any) {
      console.error('Error submitting refund:', error);
      
      let errorMessage = 'Failed to submit refund request. Please try again.';
      
      // Handle validation errors from backend (status 400)
      if (error?.status === 400 && error?.data?.errors && Array.isArray(error.data.errors)) {
        // Get all error messages from the errors array
        errorMessage = error.data.errors.map((err: any) => err.message).join('\n');
      } 
      // Handle general error message from backend
      else if (error?.data?.message) {
        errorMessage = error.data.message;
      }
      // Handle error message at top level
      else if (error?.message) {
        errorMessage = error.message;
      }
      
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMessage,
        confirmButtonColor: '#dc2626',
        background: '#1f1f1f',
        color: '#fff'
      });
    }
  };

  return (
    <div className="">
      <div className="w-full max-w-2xl ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Image width={50} height={50} src={support} alt="image" />
            <h1 className="text-4xl font-bold text-white">Refunds Order Money</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Need help with purchases, game issues, or your account? Submit a support request and our team will assist you as soon as possible.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#26242A] p-4 rounded-md">
          <h2 className="text-2xl font-semibold text-white mb-6">Submit a Refund Request</h2>

          {/* Order ID and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="orderId" className="block text-sm text-gray-400 mb-2">
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                value={formData.orderId}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border-2 border-blue-500 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Enter order ID"
                required
                disabled
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border-2 border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Reason for refund - Full Width */}
          <div>
            <label htmlFor="reason" className="block text-sm text-gray-400 mb-2">
              Reason for refund
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border-2 border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Explain your reason for refund"
              rows={4}
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-gray-800/30">
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                accept="image/jpeg,image/png,video/mp4,video/quicktime"
                className="hidden"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer"
              >
                <div className="text-gray-400 mb-2">
                  {selectedFile ? (
                    <span className="text-blue-400">{selectedFile.name}</span>
                  ) : (
                    'Choose Browser'
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  Image must be JPEG, PNG & video MP4, MOV format supported.
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-12 py-3 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;