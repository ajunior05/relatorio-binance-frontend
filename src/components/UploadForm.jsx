import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Form, Button, Alert } from 'react-bootstrap';

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [tipoRelatorio, setTipoRelatorio] = useState('ordem'); // padrão: ordem

  const handleFileChange = (e) => setFile(e.target.files[0]);

/*   const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file, tipoRelatorio);
    }
  }; */

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!file) return;
      onUpload(file, tipoRelatorio); // envia também o tipo
    };

return (
    <motion.div
      className="container mt-4"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-4">Importar CSV</h2>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="tipoRelatorio" className="mb-3">
          <Form.Label>Tipo de Relatório:</Form.Label>
          <Form.Select value={tipoRelatorio} onChange={(e) => setTipoRelatorio(e.target.value)}>
            <option value="ordem">Relatório de Ordem</option>
            <option value="transacao">Relatório de Transação</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Arquivo CSV:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <Button type="submit" variant="success">
          <FaUpload className="me-2" />
          Enviar CSV
        </Button>
      </Form>
    </motion.div>
  );
};

export default UploadForm;