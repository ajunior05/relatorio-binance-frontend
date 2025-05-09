import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUpload } from 'react-icons/fa';
import UploadForm from '../components/UploadForm';

const UploadPage = ({ onUpload }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="mt-4">
        <h2><FaUpload /> Upload de Arquivos</h2>
        <UploadForm onUpload={onUpload} />
      </Container>
    </motion.div>
  );
};

export default UploadPage;