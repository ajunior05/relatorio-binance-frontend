import React from 'react';
import { motion } from 'framer-motion';

const Home = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    <div className="text-center mt-5">
      <h1>Bem-vindo ao Relatório da Binance</h1>
      <p>Use o menu acima para importar, consultar ordens e transações.</p>
    </div>
  </motion.div>
);

export default Home;