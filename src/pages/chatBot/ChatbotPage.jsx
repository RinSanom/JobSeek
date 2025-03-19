import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import ScrollIndicator from "../../components/scrollIndicator/scrollIndicator";

const ChatbotPage = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar toggle

  const API_KEY = "AIzaSyBtrCrYDgq9boT0qPsmPNKhbYSjejGtiUk";
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);

    try {
      const result = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: message }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const newResponse = result.data.candidates[0].content.parts[0].text;
      const newChat = {
        id: Date.now(),
        question: message,
        answer: newResponse,
        timestamp: new Date().toLocaleString(),
      };

      const updatedHistory = [newChat, ...chatHistory];
      setChatHistory(updatedHistory);
      setResponse(newResponse);
      setSelectedChat(newChat);
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessage("");
    setResponse("");
    setSelectedChat(null);
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
    setResponse(chat.answer);
    setMessage(chat.question);
    setIsSidebarOpen(false); // Close sidebar on selection (mobile)
  };

  const deleteChat = (chatId) => {
    const updatedHistory = chatHistory.filter((chat) => chat.id !== chatId);
    setChatHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));

    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
      setResponse("");
      setMessage("");
    }
  };

  const parseResponse = (text) => {
    return text.split("\n").map((line, index) => {
      if (!line.trim()) return null;

      let processedLine = line.replace(/\*(.*?)\*/g, "<em>$1</em>");

      if (processedLine.match(/^#+\s+.*/) || processedLine.match(/:\s*$/)) {
        return (
          <h3
            key={index}
            className="font-bold text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: processedLine.replace(/^#+/, "").trim() }}
          />
        );
      } else if (processedLine.startsWith("* ") || processedLine.startsWith("*-")) {
        const content = processedLine.slice(2).trim();
        return (
          <li
            key={index}
            className="text-gray-600 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      } else {
        return (
          <p
            key={index}
            className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }
    }).filter(Boolean);
  };

  return (
    <>
      <ScrollIndicator />
      <div className="flex h-[85vh] bg-gray-100 dark:bg-gray-900">
        {/* Sidebar Toggle Button (Mobile/iPad) */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Sidebar */}
        <div
          className={`w-64 bg-primary mt-15 md:mt-0 lg:mt-0 text-white flex flex-col fixed inset-y-0 left-0 z-40 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:sticky md:translate-x-0 md:w-64 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">Job Seek's Chat</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            onClick={startNewChat}
            className="mx-4 mb-4 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 dark:bg-yellow-600 text-white rounded-full hover:bg-yellow-600 dark:hover:bg-yellow-700 transition text-sm sm:text-base"
          >
            + New Chat
          </button>
          <div className="flex-1 overflow-y-auto">
            <div className="px-4">
              <h3 className="text-sm font-semibold mb-2 text-gray-300 dark:text-gray-400">Recent</h3>
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`py-2 px-3 mb-2 rounded-lg cursor-pointer flex items-center justify-between ${
                    selectedChat?.id === chat.id ? "bg-blue-800 dark:bg-blue-900" : "hover:bg-blue-700 dark:hover:bg-blue-800"
                  } transition`}
                >
                  <div onClick={() => selectChat(chat)} className="flex-1 min-w-0">
                    <p className="text-sm truncate text-gray-200 dark:text-gray-300">{chat.question}</p>
                  </div>
                  <button
                    onClick={() => deleteChat(chat.id)}
                    className="text-red-400 hover:text-red-300 dark:text-red-500 dark:hover:text-red-400 transition p-1"
                    title="Delete chat"
                  >
                    <FaTrash className="w-4 h-4 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Welcome Screen */}
          {!isLoading && !selectedChat && !response && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-gray-800">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Welcome to JobSeek's AI
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 flex items-center gap-2">
                Hi <span className="text-yellow-500 dark:text-yellow-400">👋</span> Koko what can I help with
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-gray-800">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-4 border-b-4 border-blue-500"></div>
              <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">Please wait</p>
            </div>
          )}

          {/* Chat Messages Display */}
          {!isLoading && (selectedChat || response) && (
            <div className="flex-1 flex flex-col p-4 sm:p-6 bg-white dark:bg-gray-800 overflow-y-auto">
              <div className="flex flex-col gap-4 max-w-full sm:max-w-2xl mx-auto w-full">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-500 dark:bg-blue-600 text-white rounded-lg p-2 sm:p-3 max-w-xs sm:max-w-md shadow-md">
                    <p className="whitespace-pre-wrap text-sm sm:text-base">{selectedChat?.question || message}</p>
                    {selectedChat && (
                      <span className="text-xs opacity-75 mt-1 block">{selectedChat.timestamp}</span>
                    )}
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-2 sm:p-3 max-w-xs sm:max-w-md shadow-md">
                    <div className="text-sm sm:text-base">{parseResponse(response)}</div>
                    {selectedChat && (
                      <span className="text-xs opacity-75 mt-1 block">{selectedChat.timestamp}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
              <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656L7 10.828" />
                </svg>
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Kong Sisovandara"
                className="flex-1 px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 text-sm sm:text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="p-1 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 disabled:text-gray-300 dark:disabled:text-gray-600"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotPage;