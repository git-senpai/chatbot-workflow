import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineGlobe,
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
} from "react-icons/hi";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import StatusBadge from "../components/StatusBadge";
import ProgressBar from "../components/ProgressBar";
import LoadingSpinner from "../components/LoadingSpinner";
import GlassCard from "../components/GlassCard";
import ParticleBackground from "../components/ParticleBackground";
import ScrollProgress from "../components/ScrollProgress";
import GradientButton from "../components/GradientButton";
import { organizationData } from "../data/dummyData";

function OrganizationSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(organizationData.initialFormData);
  const [scrapingStatus, setScrapingStatus] = useState({
    status: "idle",
    progress: 0,
    pages: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const dummyPages = organizationData.websitePages;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchMetaDescription = async (url) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormData((prev) => ({
        ...prev,
        description: organizationData.sampleMetaDescription,
      }));
      toast.success("Meta description fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch meta description");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlBlur = () => {
    if (formData.websiteUrl) {
      fetchMetaDescription(formData.websiteUrl);
    }
  };

  const startScraping = () => {
    setScrapingStatus({ status: "scraping", progress: 0, pages: [] });

    // Simulate scraping process with progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScrapingStatus((prev) => ({
        ...prev,
        progress: Math.min(progress, 100),
      }));

      if (progress >= 100) {
        clearInterval(interval);
        setScrapingStatus({
          status: "completed",
          progress: 100,
          pages: dummyPages,
        });
        toast.success("Website scraping completed!");
      }
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startScraping();
  };

  const handleContinue = () => {
    navigate("/chatbot-integration");
  };

  return (
    <PageTransition>
      <ScrollProgress />
      <ParticleBackground />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Setup Your Organization
            </h1>
            <p className="text-gray-600">
              Let's get your chatbot ready by understanding your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <HiOutlineOfficeBuilding className="w-5 h-5 mr-2" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <HiOutlineGlobe className="w-5 h-5 mr-2" />
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    onBlur={handleUrlBlur}
                    className="input-field"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <HiOutlineDocumentText className="w-5 h-5 mr-2" />
                    Company Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-field"
                    required
                  />
                  {isLoading && (
                    <div className="mt-2 text-sm text-gray-500">
                      Fetching meta description...
                    </div>
                  )}
                </motion.div>

                <GradientButton
                  type="submit"
                  disabled={scrapingStatus.status === "scraping"}
                  className="w-full"
                >
                  {scrapingStatus.status === "scraping" ? (
                    <LoadingSpinner />
                  ) : (
                    "Start Website Scraping"
                  )}
                </GradientButton>
              </form>
            </GlassCard>

            <AnimatePresence mode="wait">
              {scrapingStatus.status !== "idle" && (
                <GlassCard className="p-6">
                  <h2 className="text-xl font-semibold gradient-text mb-4">
                    Website Scraping Status
                  </h2>

                  {scrapingStatus.status === "scraping" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <ProgressBar progress={scrapingStatus.progress} />
                      <p className="text-sm text-gray-600">
                        Scanning and processing your website content...
                      </p>
                    </motion.div>
                  )}

                  {scrapingStatus.status === "completed" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        {dummyPages.map((page, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedPage(page)}
                            className={`p-4 rounded-lg cursor-pointer transition-all glass-effect
                              ${
                                selectedPage === page
                                  ? "ring-2 ring-primary-500 bg-primary-50/50"
                                  : "hover:bg-primary-50/30"
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">{page.title}</h3>
                                <p className="text-sm text-gray-500">
                                  {page.url}
                                </p>
                              </div>
                              <StatusBadge status={page.status} />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        {selectedPage && selectedPage.chunks.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="glass-effect rounded-lg p-4"
                          >
                            <h3 className="font-medium mb-2">Content Chunks</h3>
                            <div className="space-y-2">
                              {selectedPage.chunks.map((chunk, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="p-2 bg-gray-50 rounded border border-gray-200"
                                >
                                  {chunk}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-end">
                        <GradientButton onClick={handleContinue}>
                          Continue to Chatbot Integration
                        </GradientButton>
                      </div>
                    </div>
                  )}
                </GlassCard>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default OrganizationSetup;
