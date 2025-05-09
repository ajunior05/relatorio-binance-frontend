import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import FiltroNomadForm from '../components/FiltroNomadForm';
import RelatorioNomadTabela from '../components/RelatorioNomadTabela';
import API_BASE_URL from '../config/api';

const ConsultaNomadPage = ({ registros, setRegistros, onFilter }) => {

  useEffect(() => {
    const carregarTodos = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/consultarNomad`, {
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
        <h2>Consulta de ativos da Nomad</h2>
        <br/>
        <FiltroNomadForm setRegistros={setRegistros} onFilter={onFilter}  tipo="nomad"/>
        <RelatorioNomadTabela registros={registros} />
      </div>
    </motion.div>
  );
};

export default ConsultaNomadPage;