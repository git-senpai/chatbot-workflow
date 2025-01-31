import { motion } from "framer-motion";

const statusColors = {
  scraped: {
    bg: "bg-green-100",
    text: "text-green-800",
    ring: "ring-green-600",
  },
  scraping: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    ring: "ring-yellow-600",
  },
  pending: { bg: "bg-gray-100", text: "text-gray-800", ring: "ring-gray-600" },
  error: { bg: "bg-red-100", text: "text-red-800", ring: "ring-red-600" },
};

function StatusBadge({ status }) {
  const colors = statusColors[status] || statusColors.pending;

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
        ${colors.bg} ${colors.text} ring-1 ring-inset ${colors.ring}`}
    >
      {status === "scraping" && (
        <svg
          className="animate-spin -ml-1 mr-2 h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );
}

export default StatusBadge;
