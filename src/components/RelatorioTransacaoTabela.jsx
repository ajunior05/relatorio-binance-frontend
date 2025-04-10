import React from 'react';
import { motion } from 'framer-motion';
import { Table } from 'react-bootstrap';

const RelatoriotransacaoTabela = ({ registros = [] }) => {
  if (!Array.isArray(registros)) {
    return <div>Erro: registros inválidos</div>;
  }

  if (registros.length === 0) {
    return <div className="text-center my-4">Nenhum registro encontrado.</div>;
  }
  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>Id do Usuario</th>
            <th>Tipo de Conta</th>
            <th>Operação</th>
            <th>Moeda</th>
            <th>Valor</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {registros.length > 0 ? (
            registros.map((r, idx) => (
              <tr key={idx}>
              <td>{r.utcTime}</td>
              <td>{r.userId}</td>
              <td>{r.account}</td>
              <td>{r.operation}</td>
              <td>{r.coin}</td>
              <td>{r.change}</td>
              <td>{r.remark}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">Nenhum registro encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </motion.div>
  );
};

export default RelatoriotransacaoTabela;