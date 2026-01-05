"use client";

import { motion } from "framer-motion";

interface AnimatedTaglineProps {
  tagline: string;
}

export default function AnimatedTagline({ tagline }: AnimatedTaglineProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-lg text-muted-foreground italic mt-2"
    >
      {tagline}
    </motion.p>
  );
}
