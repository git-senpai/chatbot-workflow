import { motion } from "framer-motion";

function GradientButton({
  children,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-3 rounded-xl overflow-hidden 
        bg-gradient-to-r from-primary-600 to-purple-600 
        hover:shadow-lg transition-all duration-200
        text-white font-medium ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default GradientButton;
