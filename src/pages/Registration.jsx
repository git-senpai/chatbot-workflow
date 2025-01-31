import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTransition from "../components/PageTransition";
import toast from "react-hot-toast";
import { registrationData } from "../data/dummyData";
import AnimatedBackground from "../components/AnimatedBackground";
import GlassCard from "../components/GlassCard";

function Registration() {
  const navigate = useNavigate();
  const { login, verifyEmail } = useAuth();
  const [step, setStep] = useState("register");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(registrationData.initialFormData);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Verification code sent to your email!");
      setStep("verify");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      verifyEmail();
      login(formData);
      toast.success("Email verified successfully!");
      navigate("/setup-organization");
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.error("Google authentication coming soon!");
  };

  return (
    <PageTransition>
      <AnimatedBackground />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <GlassCard className="max-w-md w-full space-y-8 p-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center"
          >
            <h2
              className="text-4xl font-bold text-gray-900 mb-2 
              bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600"
            >
              {step === "register" ? "Create Account" : "Verify Email"}
            </h2>
            <p className="text-gray-600">
              {step === "register"
                ? "Start your journey with us today"
                : "Enter the verification code sent to your email"}
            </p>
          </motion.div>

          {step === "verify" ? (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleVerificationSubmit}
              className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    name="verificationCode"
                    maxLength={6}
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    className="input-field mt-1 text-center text-2xl tracking-widest"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isLoading ? <LoadingSpinner /> : "Verify Email"}
              </button>
            </motion.form>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleRegisterSubmit}
              className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isLoading ? <LoadingSpinner /> : "Create Account"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                Google
              </button>
            </motion.form>
          )}
        </GlassCard>
      </div>
    </PageTransition>
  );
}

export default Registration;
