import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FiltroForm = ({ onFilter, tipo }) => {
  const [orderNo, setOrderNo] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ orderNo, data, status }, tipo);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-2">
          <Col md>
            <Form.Control type="text" placeholder="OrderNo" value={orderNo} onChange={e => setOrderNo(e.target.value)} />
          </Col>
          <Col md>
            <Form.Control type="date" value={data} onChange={e => setData(e.target.value)} />
          </Col>
          <Col md>
            <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="FILLED">Finalizada</option>
              <option value="CANCELED">Cancelada</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button type="submit" variant="primary"><FaSearch /> Buscar</Button>
          </Col>
        </Row>
      </Form>
    </motion.div>
  );
};

export default FiltroForm;