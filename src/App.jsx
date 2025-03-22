import React, { useState, useEffect } from "react";
import "./index.css"; // Ensure Tailwind is properly set up

const App = () => {
  const faqs = [
    {
      question:
        "Can I use YouTube thumbnail downloader to download thumbnails for any video?",
      answer:
        "YouTube thumbnail downloaders are intended for personal and non-commercial use. It's essential to respect the copyright and intellectual property rights of others. Ensure that you have the necessary permissions or consider fair use policies when using downloaded thumbnails.",
    },
    {
      question:
        "Do I need permission to use thumbnails downloaded from YouTube?",
      answer:
        "The ownership and rights to the videos and their thumbnails reside with the original creators. Using downloaded thumbnails without permission may infringe upon copyright laws. It's advisable to seek permission from the video creators or check if they provide explicit permission or guidelines for using their thumbnails.",
    },
    {
      question: "Can I use downloaded thumbnails for commercial purposes?",
      answer:
        "Generally, using downloaded thumbnails for commercial purposes without permission may violate copyright laws and could lead to legal consequences. It's important to obtain proper authorization or explore alternative options like creating your own custom thumbnails or seeking licensed images.",
    },
    {
      question:
        "Are there any restrictions on modifying downloaded YouTube thumbnails?",
      answer:
        "Modifying downloaded thumbnails may be subject to copyright laws. Altering or manipulating thumbnails without permission may infringe upon the original creator's rights. If you need to modify a thumbnail, it's advisable to obtain proper authorization or consider creating your own custom graphics.",
    },
    {
      question:
        "What are the consequences of copyright infringement when using downloaded thumbnails?",
      answer:
        "Copyright infringement can have legal ramifications, including potential legal actions, penalties, and financial liabilities. It's crucial to respect copyright laws and obtain appropriate permissions or licenses before using thumbnails downloaded from YouTube or any other platform. Familiarize yourself with the copyright policies and laws of your jurisdiction to ensure compliance.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  // Get user theme preference from localStorage or system preference
  const getInitialTheme = () => {
    // First check localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Then check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Apply the theme to <html> tag
  useEffect(() => {
    // This is crucial - apply dark class to document.documentElement (the HTML tag)
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark-mode"); // Additional class for body if needed
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark-mode"); // Additional class for body if needed
      localStorage.setItem("theme", "light");
    }

    // Debug
    console.log("Dark mode state:", darkMode);
    console.log("HTML classes:", document.documentElement.classList.toString());
  }, [darkMode]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Extract YouTube Video ID and generate thumbnail URL
  const handleThumbnailDownload = () => {
    let videoId;

    // Handle standard youtube.com URLs
    if (videoUrl.includes("youtube.com/watch?v=")) {
      videoId = videoUrl.split("v=")[1]?.split(/[&?]/)[0];
    }
    // Handle youtu.be short URLs
    else if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("youtu.be/")[1]?.split(/[&?]/)[0];
    }

    if (videoId) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      window.open(thumbnailUrl, "_blank");
    } else {
      alert("Please enter a valid YouTube URL (youtube.com or youtu.be).");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white text-black border-gray-300"
        } shadow w-full py-4 px-6 flex items-center justify-between border-b transition-colors duration-300`}
      >
        <div className="flex items-center space-x-2 text-3xl font-bold">
          <i className="bi bi-play-circle text-red-600 text-3xl"></i>
          <span>YouTube Thumbnail Downloader</span>
        </div>

        <div className="flex items-center space-x-4">
          {/* GitHub Button */}
          <button
            className="bg-black text-white px-4 py-2 rounded-lg text-lg font-medium hover:bg-gray-800 flex items-center space-x-2 cursor-pointer"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <i className="bi bi-github"></i>
            <span>GitHub</span>
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            className={`${
              darkMode ? "text-gray-300" : "text-gray-900"
            } text-2xl cursor-pointer`}
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <i className="bi bi-brightness-high"></i> // Light mode icon
            ) : (
              <i className="bi bi-moon"></i> // Dark mode icon
            )}
          </button>
        </div>
      </header>

      {/* Input Section */}
      <div className="flex flex-col items-center justify-center flex-grow mt-2">
        <div
          className={`${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } shadow-md rounded-lg p-8 w-full max-w-3xl transition-colors duration-300`}
        >
          <label className="block text-xl font-medium mb-3">
            YouTube Video Link
          </label>
          <input
            type="text"
            placeholder="Enter YouTube video URL..."
            className={`w-full p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-400"
            }`}
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <p
            className={`mt-2 mb-3 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <strong>Sample YouTube Link: </strong>
            https://www.youtube.com/watch?v=dQw4w9WgXcQ
          </p>
          <button
            className="bg-black text-white w-full py-2 rounded-md text-xl font-semibold hover:bg-gray-900 cursor-pointer"
            onClick={handleThumbnailDownload}
          >
            Get Thumbnail
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-3xl mt-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-b py-3 cursor-pointer ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div
              className={`flex justify-between items-center font-medium text-lg ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "▲" : "▼"}</span>
            </div>
            {openIndex === index && (
              <p
                className={`mt-2 text-base ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        className={`w-full text-center py-4 mt-6 shadow border-t text-md ${
          darkMode
            ? "bg-gray-800 text-gray-300 border-gray-600"
            : "bg-white text-gray-800 border-gray-300"
        }`}
      >
        Built by diya-noor7212. The source code is available on{" "}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          GitHub
        </a>
        .
      </footer>
    </div>
  );
};

export default App;
