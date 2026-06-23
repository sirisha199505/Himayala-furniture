"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

const EASE = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true

}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}>
      
      {children}
    </motion.div>);

}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};

export function Stagger({
  children,
  className,
  once = true

}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}>
      
      {children}
    </motion.div>);

}

export function StaggerItem({
  children,
  className

}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>);

}
