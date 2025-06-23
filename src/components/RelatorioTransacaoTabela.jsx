import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table } from 'react-bootstrap';

const RelatoriotransacaoTabela = ({ registros = [] }) => {
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

    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
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
            <th onClick={() => handleSort('utcTime')} style={{ cursor: 'pointer' }}>Data {renderSortIcon('utcTime')}</th>
            <th onClick={() => handleSort('userId')} style={{ cursor: 'pointer' }}>Id do Usuário {renderSortIcon('userId')}</th>
            <th onClick={() => handleSort('account')} style={{ cursor: 'pointer' }}>Tipo de Conta {renderSortIcon('account')}</th>
            <th onClick={() => handleSort('operation')} style={{ cursor: 'pointer' }}>Operação {renderSortIcon('operation')}</th>
            <th onClick={() => handleSort('coin')} style={{ cursor: 'pointer' }}>Moeda {renderSortIcon('coin')}</th>
            <th onClick={() => handleSort('change')} style={{ cursor: 'pointer' }}>Valor {renderSortIcon('change')}</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {sortedRegistros.map((r, idx) => (
            <tr key={idx}>
              <td>{r.utcTime}</td>
              <td>{r.userId}</td>
              <td>{r.account}</td>
              <td>{r.operation}</td>
              <td>{r.coin}</td>
              <td>{r.change}</td>
              <td>{r.remark}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </motion.div>
  );
};

export default RelatoriotransacaoTabela;