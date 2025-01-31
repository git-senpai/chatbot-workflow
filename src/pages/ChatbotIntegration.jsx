import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiCode, HiMail, HiExternalLink, HiCheck } from "react-icons/hi";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import LoadingSpinner from "../components/LoadingSpinner";
import SuccessConfetti from "../components/SuccessConfetti";
import GlassCard from "../components/GlassCard";
import ParticleBackground from "../components/ParticleBackground";
import ScrollProgress from "../components/ScrollProgress";
import GradientButton from "../components/GradientButton";
import { lazy, Suspense } from "react";
const AnimatedLogo = lazy(() => import("../components/AnimatedLogo"));
import { chatbotData } from "../data/dummyData";

function ChatbotIntegration() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("test");
  const [integrationStatus, setIntegrationStatus] = useState("pending");
  const [showFeedbackBar, setShowFeedbackBar] = useState(false);
  const [developerEmail, setDeveloperEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTestChatbot = () => {
    const baseUrl = window.location.origin;
    window.open(`${baseUrl}/chatbot-demo`, "_blank");
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  const handleSendInstructions = async () => {
    if (!developerEmail) {
      toast.error("Please enter developer's email");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Instructions sent to developer!");
      setDeveloperEmail("");
    } catch (error) {
      toast.error("Failed to send instructions");
    } finally {
      setIsLoading(false);
    }
  };

  const checkIntegration = async () => {
    setIsLoading(true);
    try {
      // Simulate integration check
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setActiveTab("success");
      setIntegrationStatus("success");
    } catch (error) {
      setIntegrationStatus("failed");
    } finally {
      setIsLoading(false);
    }
  };

  const integrationCode = chatbotData.integrationCode;

  return (
    <PageTransition>
      <ScrollProgress />
      <ParticleBackground />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {integrationStatus === "success" && <SuccessConfetti />}

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <Suspense fallback={<div className="w-32 h-32" />}>
                <AnimatedLogo />
              </Suspense>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Chatbot Integration
            </h1>
            <p className="text-gray-600">
              Let's get your chatbot up and running on your website
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "test" && (
              <GlassCard className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold gradient-text mb-4">
                      Test Your Chatbot
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Preview how your chatbot will appear on your website
                    </p>
                    <GradientButton
                      onClick={handleTestChatbot}
                      className="w-full sm:w-auto flex items-center justify-center"
                    >
                      <HiExternalLink className="w-5 h-5 mr-2" />
                      Open Test Environment
                    </GradientButton>
                  </div>

                  {showFeedbackBar && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="glass-effect rounded-xl p-4"
                    >
                      <h3 className="font-medium text-yellow-800 mb-2">
                        Share Your Feedback
                      </h3>
                      <textarea
                        className="input-field"
                        rows={3}
                        placeholder="Tell us what's not working..."
                      />
                      <GradientButton className="mt-2">
                        Submit Feedback
                      </GradientButton>
                    </motion.div>
                  )}

                  <div className="border-t pt-6">
                    <GradientButton
                      onClick={() => setActiveTab("integrate")}
                      className="w-full"
                    >
                      Continue to Integration
                    </GradientButton>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === "integrate" && (
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold gradient-text mb-6">
                  Choose Integration Method
                </h2>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-effect rounded-xl p-6"
                  >
                    <h3 className="flex items-center font-medium mb-4">
                      <HiCode className="w-5 h-5 mr-2" />
                      Option 1: Add Code to Your Website
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <pre className="text-sm text-gray-100 overflow-x-auto">
                        {integrationCode}
                      </pre>
                    </div>
                    <GradientButton
                      onClick={() => copyToClipboard(integrationCode)}
                      className="mt-4 flex items-center"
                    >
                      <HiCheck className="w-5 h-5 mr-2" />
                      Copy Code
                    </GradientButton>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-effect rounded-xl p-6"
                  >
                    <h3 className="flex items-center font-medium mb-4">
                      <HiMail className="w-5 h-5 mr-2" />
                      Option 2: Send Instructions to Developer
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="email"
                        value={developerEmail}
                        onChange={(e) => setDeveloperEmail(e.target.value)}
                        placeholder="Developer's email address"
                        className="input-field"
                      />
                      <GradientButton
                        onClick={handleSendInstructions}
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            <HiMail className="w-5 h-5 mr-2" />
                            Send Instructions
                          </>
                        )}
                      </GradientButton>
                    </div>
                  </motion.div>

                  <div className="border-t pt-6">
                    <GradientButton
                      onClick={checkIntegration}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? <LoadingSpinner /> : "Test Integration"}
                    </GradientButton>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === "success" && (
              <GlassCard className="p-6 text-center">
                {integrationStatus === "success" ? (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-6xl"
                    >
                      🎉
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold gradient-text"
                    >
                      Integration Successful!
                    </motion.h2>
                    <p className="text-gray-600">
                      Your chatbot is now ready to help your customers
                    </p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                    >
                      <GradientButton>Explore Admin Panel</GradientButton>
                      <GradientButton className="btn-secondary">
                        Start Talking to Your Chatbot
                      </GradientButton>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex justify-center space-x-4 mt-6"
                    >
                      <button className="text-gray-600 hover:text-blue-600 transition-colors">
                        <span className="sr-only">Share on Twitter</span>
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-blue-600 transition-colors">
                        <span className="sr-only">Share on LinkedIn</span>
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-red-600">
                      Integration Not Detected
                    </h2>
                    <p className="text-gray-600">
                      We couldn't detect the chatbot on your website. Please
                      make sure you've added the code correctly and try again.
                    </p>
                    <GradientButton onClick={() => setActiveTab("integrate")}>
                      Back to Integration
                    </GradientButton>
                  </div>
                )}
              </GlassCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}

export default ChatbotIntegration;
