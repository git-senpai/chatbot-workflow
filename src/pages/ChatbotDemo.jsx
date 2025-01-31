import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChatAlt } from "react-icons/hi";
import ChatbotWidget from "../components/ChatbotWidget";
import GlassCard from "../components/GlassCard";
import ParticleBackground from "../components/ParticleBackground";
import ScrollProgress from "../components/ScrollProgress";
import GradientButton from "../components/GradientButton";
import { chatbotData } from "../data/dummyData";
import LoadingSpinner from "../components/LoadingSpinner";

function ChatbotDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const { title, description, sampleContent } = chatbotData.demoContent;
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
    setShowFeedback(false);
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-primary-50 via-white to-purple-50">
      <ScrollProgress />
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 bg-yellow-100/80 backdrop-blur-sm p-4 text-center z-10"
      >
        <GradientButton
          onClick={() => setShowFeedback(true)}
          className="text-yellow-800 hover:text-yellow-900"
        >
          <HiOutlineChatAlt className="w-5 h-5 mr-2 inline" />
          Chatbot not working as intended? Share feedback
        </GradientButton>
      </motion.div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <GlassCard className="w-full max-w-lg p-6">
              <h3 className="text-xl font-semibold gradient-text mb-4">
                Share Your Feedback
              </h3>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="input-field"
                  rows={4}
                  placeholder="Tell us what's not working..."
                />
                <div className="flex justify-end space-x-4">
                  <GradientButton
                    type="button"
                    onClick={() => setShowFeedback(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </GradientButton>
                  <GradientButton type="submit">Submit Feedback</GradientButton>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold gradient-text mb-6">{title}</h1>
          <p className="text-gray-600 mb-8">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose max-w-none"
        >
          {sampleContent.map((section, index) => (
            <GlassCard
              key={index}
              className="p-6 mb-6"
              delay={0.2 * (index + 1)}
            >
              <h2 className="gradient-text text-2xl font-semibold mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700">{section.text}</p>
            </GlassCard>
          ))}
        </motion.div>
      </div>

      <ChatbotWidget />
    </div>
  );
}

export default ChatbotDemo;
