import React, { useState ,useEffect} from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Form, Button, Row, Col } from 'react-bootstrap';
import API_BASE_URL from '../config/api';

const FiltroForm = ({ onFilter, tipo }) => {
  const [orderNo, setOrderNo] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');
  const [pairs, setPairs] = useState('');
  const [pairsOptions, setPairsOptions] = useState('');

  useEffect(() => {
      const fetchPairs = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Nenhum token encontrado. Usuário não autenticado.');
            setPairsOptions([]);
            return;
          }

          console.log('Fazendo requisição para:', `${API_BASE_URL}/api/pairs`);
          console.log('Token usado:', token);

          const response = await fetch(`${API_BASE_URL}/api/pairs`, {
            headers: {
              Authorization: token,
            },
          });

          console.log('Status HTTP:', response.status);
          console.log('Response OK:', response.ok);

          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
          }

          const responseData = await response.json();
          console.log('Resposta da API /api/pairs:', responseData);

          // Garante que responseData é um array
          if (Array.isArray(responseData)) {
            setPairsOptions(responseData);
          } else {
            console.error('Resposta da API não é um array:', responseData);
            setPairsOptions([]);
          }
        } catch (error) {
          console.error('Erro ao buscar pares de criptomoedas:', {
            message: error.message,
            name: error.name,
          });
          setPairsOptions([]); // Mantém como array vazio em caso de erro
        }
      };

      fetchPairs();
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ orderNo, data, status, pairs }, tipo);
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
          <Col md>
            <Form.Select value={pairs} onChange={(e) => setPairs(e.target.value)}>
              <option value="">Pares</option>
              {Array.isArray(pairsOptions) && pairsOptions.length > 0 ? (
                pairsOptions.map((option) => (
                  <option key={option.id} value={option.pair}>
                    {option.pair}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhum par disponível
                </option>
              )}
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