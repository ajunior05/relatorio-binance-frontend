import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Form, Button, Row, Col } from 'react-bootstrap';
import API_BASE_URL from '../config/api';

const FiltroNomadForm = ({ onFilter, tipo }) => {
  const [symbol, setSymbol] = useState('');
  const [data, setTradeDate] = useState('');
  const [action, setAction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ symbol, data, action }, tipo);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-2">
          <Col md>
            <Form.Control type="text" placeholder="symbol" value={symbol} onChange={e => setSymbol(e.target.value)} />
          </Col>
          <Col md>
            <Form.Control type="date" value={data} onChange={e => setTradeDate(e.target.value)} />
          </Col>
          <Col md>
            <Form.Select value={action} onChange={e => setAction(e.target.value)}>
              <option value="">Selecione</option>
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
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

export default FiltroNomadForm;