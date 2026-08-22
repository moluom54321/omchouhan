import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am Om\'s AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages.filter(m => m.role !== 'system'), userMessage] }),
      });

      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      
      const botMessage = data.choices[0].message;
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting to my server right now. Please try again later or use the contact form!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(var(--primary-color-rgb),0.5)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'block'}`}
      >
        <FaCommentDots className="text-2xl" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] bg-[#0a0a0a] border border-border-color rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#111111] border-b border-border-color p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">AI</span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Om's Assistant</h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-text hover:text-white transition-colors">
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-[#1a1a1a] text-white border border-border-color rounded-bl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] border border-border-color p-3 rounded-2xl rounded-bl-none flex gap-1">
                    <div className="w-2 h-2 bg-muted-text rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-text rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-text rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border-color bg-[#111111] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Om's work..."
                className="flex-1 bg-[#1a1a1a] border border-border-color rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary text-white p-2 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
