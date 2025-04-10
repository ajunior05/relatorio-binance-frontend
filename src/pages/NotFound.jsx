import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => (
  <motion.div
    className="text-center mt-5"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h1><FaExclamationTriangle color="red" /> Página não encontrada</h1>
    <p>Oops! A página que você tentou acessar não existe.</p>
  </motion.div>
);

export default NotFound;