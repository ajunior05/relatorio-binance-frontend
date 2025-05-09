import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Form, Button, Row, Col } from 'react-bootstrap';
import API_BASE_URL from '../config/api';

const FiltroParesForm = ({ onFilter, tipo }) => {
  const [baseCurrancy, setBaseCurrancy] = useState('');
  const [pair, setPair] = useState('');
  const [quoteCurrancy, setQuoteCurrancy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ baseCurrancy, pair, quoteCurrancy }, tipo);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-2">
          <Col md>
            <Form.Control type="text" placeholder="baseCurrancy" value={baseCurrancy} onChange={e => setBaseCurrancy(e.target.value)} />
          </Col>
            <Col md>
            <Form.Control type="text" placeholder="pair" value={pair} onChange={e => setPair(e.target.value)} />
            </Col>
            <Col md>
            <Form.Control type="text" placeholder="quoteCurrancy" value={quoteCurrancy} onChange={e => setQuoteCurrancy(e.target.value)} />
            </Col>
          <Col md="auto">
            <Button type="submit" variant="primary"><FaSearch /> Buscar</Button>
          </Col>
        </Row>
      </Form>
    </motion.div>
  );
};

export default FiltroParesForm;