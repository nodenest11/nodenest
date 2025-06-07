import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/90 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <motion.div
          className="relative w-24 h-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-[var(--primary-gradient-from)]"
            animate={{
              rotate: 360,
              borderColor: [
                "var(--primary-gradient-from)",
                "var(--primary-gradient-to)",
                "var(--primary-gradient-from)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              borderColor: { duration: 2, repeat: Infinity },
            }}
          />
          <motion.div
            className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-t-4 border-[var(--primary-gradient-to)]"
            animate={{
              rotate: -360,
              borderColor: [
                "var(--primary-gradient-to)",
                "var(--primary-gradient-from)",
                "var(--primary-gradient-to)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              borderColor: { duration: 2, repeat: Infinity },
            }}
          />
          <motion.div
            className="absolute top-4 left-4 right-4 bottom-4 rounded-full border-t-4 border-[#00bfff]"
            animate={{
              rotate: 360,
              borderColor: ["#00bfff", "var(--primary-gradient-from)", "#00bfff"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              borderColor: { duration: 2, repeat: Infinity },
            }}
          />
        </motion.div>
        <motion.div
          className="mt-6 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Atom Flow
        </motion.div>
      </div>
    </div>
  );
}
