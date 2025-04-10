import React from 'react';
import { motion } from 'framer-motion';
import { Table } from 'react-bootstrap';

const RelatorioOrdemTabela = ({ registros = [] }) => {
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
            <th>OrderNo</th>
            <th>Par</th>
            <th>Tipo</th>
            <th>Side</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Executado</th>
            <th>Preço Médio</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {registros.length > 0 ? (
            registros.map((r, idx) => (
              <tr key={idx}>
              <td>{r.dateUTC}</td>
              <td>{r.orderNo}</td>
              <td>{r.pair}</td>
              <td>{r.type}</td>
              <td>{r.side}</td>
              <td>{r.orderPrice}</td>
              <td>{r.orderAmount}</td>
              <td>{r.executed}</td>
              <td>{r.averagePrice}</td>
              <td>{r.tradingTotal}</td>
              <td>{r.status}</td>
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

export default RelatorioOrdemTabela;