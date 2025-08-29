import React, { useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const inputRef = useRef();

  const send = () => {
    const v = inputRef.current.value.trim();
    if (!v) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: v },
      { from: "bot", text: "Thanks! Our team will get back to you shortly." },
    ]);
    inputRef.current.value = "";
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 rounded-full p-4 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          aria-label="Open chat"
          title="Chat with us"
        >
          <MessageCircle size={22} />
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-3 py-2 bg-blue-600 text-white">
            <span className="font-medium">Help chat</span>
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/10">
              <X size={18} />
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-lg ${
                  m.from === "user" ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 p-2 border-t border-gray-200 dark:border-gray-700">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 outline-none"
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={send} className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Footer = () => {
  return (
    <>
      <ChatWidget />
      <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-3 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-xs md:text-sm">
          © {new Date().getFullYear()} CleanHub. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;