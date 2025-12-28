"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaCheckCircle, FaCopy } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  isVerified?: boolean;
}

interface Conversation {
  id: string;
  user: string;
  lastMessage: string;
  timestamp: string;
}

const Message: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>('rush007');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const conversations: Conversation[] = [
    { id: '1', user: 'rush007', lastMessage: 'hi brother, can i start your order?', timestamp: '2days ago' },
    { id: '2', user: 'rush007', lastMessage: 'hi brother, can i start your order?', timestamp: '8h ago' },
    { id: '3', user: 'rush007', lastMessage: 'hi brother, can i start your order?', timestamp: '22h ago' },
    { id: '4', user: 'rush007', lastMessage: 'hi brother, can i start your order?', timestamp: '23h ago' },
  ];

  const messages: Message[] = [
    {
      id: '1',
      user: 'rush007',
      text: 'hi brother, can i start your order?',
      timestamp: '2 day',
      isVerified: false
    }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText('45068056850#7u0rhvmc dcvjkrug3045t-3-0orr');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className=''>
    {/* Navigation Tabs */}
        <div className="pt-5 w-[50px] flex space-x-1 md:space-x-3 border-b border-gray-700">
          <button className="flex-1 px-4 py-3 text-sm font-medium bg-[#AC2212] hover:bg-red-700 transition-colors rounded-md">
            All
          </button>
          <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#AC2212] bg-[#282836] transition-colors rounded-md">
            Boosting
          </button>
          <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#AC2212] bg-[#282836] transition-colors rounded-md">
            Orders
          </button>
          <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#AC2212] bg-[#282836] transition-colors rounded-md">
            Support
          </button>
        </div>
    <div className="flex  my-5">
      {/* Sidebar */}
      <div className="w-64 rounded-l-md bg-[#282836] border-r border-gray-700">
        
        {/* Browse message header */}
        <div className="bg-[#ac21128f] rounded-tl-md text-white px-4 py-3 bg-gray-750 text-sm font-medium border-b border-gray-700">
          Browse message
        </div>

        {/* Conversations List */}
        <div className="overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.user)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-[#282836] transition-colors border-b border-gray-750 ${
                selectedConversation === conv.user ? 'bg-[#282836]' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#282836] flex items-center justify-center flex-shrink-0">
                <FaUser className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-white">{conv.user}</span>
                  <span className="text-xs text-gray-400">{conv.timestamp}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{conv.user}</p>
                <p className="text-xs text-gray-300 mt-1">{conv.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-900 ">
        {/* Chat Header */}
        <div className="flex items-center gap-3  px-6 py-4 bg-[#282836] border-b border-gray-700">
          <div className="w-10 h-10 rounded-full bg-[#282836] flex items-center justify-center">
            <FaUser className="text-gray-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{selectedConversation}</span>
              <FaCheckCircle className="text-blue-400 text-sm" />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <AiFillLike size={20} />
              <span>100%</span>
              <span className="text-blue-400 underline">25 reviews</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {/* Boosting Request Card */}
          <div className="bg-[#282836] rounded-lg p-4 max-w-2xl">
            <h3 className="text-sm font-medium mb-3">Boosting request chat started</h3>
            <Link 
              href="https://www.middlegihovccwlfpgudftglxvhmhr.dmmrfewkmidchs.p304358m"
              className="text-xs text-blue-400 hover:underline block mb-3 break-all"
            >
              https://www.middlegihovccwlfpgudftglxvhmhr.dmmrfewkmidchs.p304358m
            </Link>
            <div className="bg-gray-900 rounded p-3 flex items-center justify-between">
              <code className="text-xs text-gray-300 font-mono break-all">
                45068056850#7u0rhvmc dcvjkrug3045t-3-0orr
              </code>
              <button
                onClick={handleCopyCode}
                className="ml-3 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                title="Copy code"
              >
                <FaCopy className="text-sm" />
              </button>
            </div>
            <Link 
              href="http://www.dfdvmnhlfch.gg"
              className="text-xs text-blue-400 hover:underline block mt-2"
            >
              www.dfdvmnhlfch.gg
            </Link>
          </div>

          {/* User Message */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#282836] flex items-center justify-center flex-shrink-0">
              <FaUser className="text-gray-400 text-sm" />
            </div>
            <div>
              <div className="bg-[#282836] rounded-lg px-4 py-2 inline-block">
                <p className="text-sm">hi brother,</p>
                <p className="text-sm">can i start your order?</p>
              </div>
              <span className="text-xs text-gray-500 ml-2 mt-1 inline-block">2 day</span>
            </div>
          </div>

          {/* Inactive Notice */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-500">this conversation is no longer active</p>
          </div>
        </div>

        {/* Input Area (Disabled) */}
        <div className="px-6 py-4  bg-[#282836] border-t border-gray-700">
          <div className="flex items-center gap-3 opacity-50 cursor-not-allowed">
            <input
              type="text"
              placeholder="Type a message..."
              disabled
              className="flex-1 bg-[#282836] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              disabled
              className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Copy notification */}
      {copiedCode && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          Code copied to clipboard!
        </div>
      )}
    </div>
    </section>
  );
};

export default Message;