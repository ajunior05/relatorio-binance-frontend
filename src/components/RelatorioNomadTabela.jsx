import React from 'react';
import { motion } from 'framer-motion';
import { Table } from 'react-bootstrap';

const RelatorioNomadTabela = ({ registros = [] }) => {
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
             <th>Usuário: {registros[0]?.usuario?.nome}</th>
            </tr>
          <tr>
            <th>Data</th>
            <th>Sigla</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {registros.length > 0 ? (
            registros.map((r, idx) => (
              <tr key={idx}>
              <td>{r.tradeDate}</td>
              <td>{r.symbol}</td>
              <td>{r.action}</td>
              <td>{r.quantity}</td>
              <td>{r.price}</td>
              <td>{r.netAmount}</td>
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

export default RelatorioNomadTabela;