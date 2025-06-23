import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table } from 'react-bootstrap';

const RelatorioNomadTabela = ({ registros = [] }) => {
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

  const sortedRegistros = [...registros].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    // Se for número
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }

    // Se for data (campo tradeDate)
    if (sortConfig.key === 'tradeDate') {
      return sortConfig.direction === 'asc'
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    // Default: comparação string
    return sortConfig.direction === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  if (!Array.isArray(registros)) {
    return <div>Erro: registros inválidos</div>;
  }

  if (registros.length === 0) {
    return <div className="text-center my-4">Nenhum registro encontrado.</div>;
  }

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽';
  };

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="6">Usuário: {registros[0]?.usuario?.nome}</th>
          </tr>
          <tr>
            <th onClick={() => handleSort('tradeDate')} style={{ cursor: 'pointer' }}>
              Data {renderSortIcon('tradeDate')}
            </th>
            <th onClick={() => handleSort('symbol')} style={{ cursor: 'pointer' }}>
              Sigla {renderSortIcon('symbol')}
            </th>
            <th onClick={() => handleSort('action')} style={{ cursor: 'pointer' }}>
              Tipo {renderSortIcon('action')}
            </th>
            <th onClick={() => handleSort('quantity')} style={{ cursor: 'pointer' }}>
              Quantidade {renderSortIcon('quantity')}
            </th>
            <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
              Preço {renderSortIcon('price')}
            </th>
            <th onClick={() => handleSort('netAmount')} style={{ cursor: 'pointer' }}>
              Total {renderSortIcon('netAmount')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRegistros.map((r, idx) => (
            <tr key={idx}>
              <td>{r.tradeDate}</td>
              <td>{r.symbol}</td>
              <td>{r.action}</td>
              <td>{r.quantity}</td>
              <td>{r.price}</td>
              <td>{r.netAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </motion.div>
  );
};

export default RelatorioNomadTabela;