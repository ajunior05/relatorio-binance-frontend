import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FiltroTransacaoForm = ({ onFilter, tipo}) => {
  const [operation, setOperation] = useState('');
  const [data, setData] = useState('');
  const [coin, setCoin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ operation, data, coin }, tipo);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-2">
          <Col md>
            <Form.Control type="text" placeholder="Operation" value={operation} onChange={e => setOperation(e.target.value)} />
          </Col>
          <Col md>
            <Form.Control type="date" value={data} onChange={e => setData(e.target.value)} />
          </Col>
          <Col md>
            <Form.Select value={coin} onChange={e => setCoin(e.target.value)}>
              <option value="">Moeda</option>
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
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

export default FiltroTransacaoForm;