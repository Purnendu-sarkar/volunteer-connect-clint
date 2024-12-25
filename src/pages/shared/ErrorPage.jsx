import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-8xl font-extrabold mb-8 text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        404
      </motion.h1>

      {/* Error Message */}
      <motion.p
        className="text-xl mb-12 text-center max-w-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        We're sorry, but the page you were looking for doesn't exist. It might
        have been moved or deleted.
      </motion.p>

      {/* Back to Home Button with Animation */}
      <motion.button
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-500 transition-colors"
        onClick={() => navigate("/")}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Go to Homepage
      </motion.button>
    </div>
  );
};

export default ErrorPage;
