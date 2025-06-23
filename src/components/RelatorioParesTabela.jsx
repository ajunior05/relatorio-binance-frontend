import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table } from 'react-bootstrap';

const RelatorioParesTabela = ({ registros = [] }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      } else {
        return { key, direction: 'asc' };
      }
    });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽';
  };

  const sortedRegistros = [...registros].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    return sortConfig.direction === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  if (!Array.isArray(registros)) return <div>Erro: registros inválidos</div>;
  if (registros.length === 0) return <div className="text-center my-4">Nenhum registro encontrado.</div>;

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="3">Usuário: {registros[0]?.usuario?.nome}</th>
          </tr>
          <tr>
            <th onClick={() => handleSort('pair')} style={{ cursor: 'pointer' }}>Par {renderSortIcon('pair')}</th>
            <th onClick={() => handleSort('baseCurrency')} style={{ cursor: 'pointer' }}>Cripto {renderSortIcon('baseCurrency')}</th>
            <th onClick={() => handleSort('quoteCurrancy')} style={{ cursor: 'pointer' }}>Moeda {renderSortIcon('quoteCurrancy')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedRegistros.map((r, idx) => (
            <tr key={idx}>
              <td>{r.pair}</td>
              <td>{r.baseCurrency}</td>
              <td>{r.quoteCurrancy}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </motion.div>
  );
};

export default RelatorioParesTabela;