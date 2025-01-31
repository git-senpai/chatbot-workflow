import { motion } from "framer-motion";

function GlassCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl 
        border border-white/20 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
