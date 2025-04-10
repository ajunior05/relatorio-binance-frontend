import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import FiltroTransacaoForm from '../components/FiltroTransacaoForm';
import RelatorioTransacaoTabela from '../components/RelatorioTransacaoTabela';

const ConsultaTransacaoPage = ({ registros, setRegistros, onFilter }) => {

  useEffect(() => {
    const carregarTodos = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/api/consultarTransacao', {
        headers: {
          Authorization: token // <-- corrigido!
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRegistros(data);
      } else {
        console.error("Erro ao carregar registros", response.coin);
      }
    };

    carregarTodos();
  }, [setRegistros]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <h2>Consulta de transações</h2>
        <FiltroTransacaoForm setRegistros={setRegistros} onFilter={onFilter} tipo="transacao"/>
        <RelatorioTransacaoTabela registros={registros} />
      </div>
    </motion.div>
  );
};

export default ConsultaTransacaoPage;