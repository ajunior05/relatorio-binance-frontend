import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import FiltroForm from '../components/FiltroForm';
import RelatorioOrdemTabela from '../components/RelatorioOrdemTabela';
import API_BASE_URL from '../config/api';

const ConsultaPage = ({ registros, setRegistros, onFilter }) => {

  useEffect(() => {
    const carregarTodos = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/consultarOrdem`, {
        headers: {
          Authorization: token // <-- corrigido!
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRegistros(data);
      } else {
        console.error("Erro ao carregar registros", response.status);
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
        <h2>Consulta de Ordens</h2>
        <FiltroForm setRegistros={setRegistros} onFilter={onFilter}  tipo="ordem"/>
        <RelatorioOrdemTabela registros={registros} />
      </div>
    </motion.div>
  );
};

export default ConsultaPage;