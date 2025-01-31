import { motion } from "framer-motion";

function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  className = "",
}) {
  return (
    <div className="relative">
      <motion.input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className={`peer h-14 w-full border-b-2 border-gray-300 text-gray-900 
          placeholder-transparent focus:outline-none focus:border-primary-600
          bg-transparent ${className}`}
      />
      <motion.label
        htmlFor={name}
        className="absolute left-0 -top-3.5 text-gray-600 text-sm 
          transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
          peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-600 
          peer-focus:text-sm"
      >
        {label}
      </motion.label>
    </div>
  );
}

export default FloatingInput;
