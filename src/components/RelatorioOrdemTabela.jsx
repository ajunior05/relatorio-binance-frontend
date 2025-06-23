import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import API_BASE_URL from '../config/api';

const RelatorioOrdemTabela = ({ registros = [], setRegistros }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  if (!Array.isArray(registros)) {
    return <div>Erro: registros inválidos</div>;
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Se clicar na mesma coluna, inverte a direção
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Nova coluna, começa com ascendente
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleRemove = async (id) => {
    const token = localStorage.getItem('token');
    const confirmacao = window.confirm('Tem certeza que deseja excluir este registro?');
    if (!confirmacao) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/ordem/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      });

      if (response.ok) {
        toast.success('Ordem excluída com sucesso.');
        setRegistros(registros.filter(r => r.orderNo !== id)); // Remove do frontend também
      } else {
        toast.error('Falha ao excluir a ordem.');
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
      toast.error('Erro na exclusão.');
    }
  };

  const sortedRegistros = [...registros].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn] ?? '';
    const bValue = b[sortColumn] ?? '';

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? ' 🔼' : ' 🔽';
  };

  if (registros.length === 0) {
    return <div className="text-center my-4">Nenhum registro encontrado.</div>;
  }

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('dateUTC')}>Data{renderSortIcon('dateUTC')}</th>
            <th onClick={() => handleSort('orderNo')}>OrderNo{renderSortIcon('orderNo')}</th>
            <th onClick={() => handleSort('pair')}>Par{renderSortIcon('pair')}</th>
            <th onClick={() => handleSort('type')}>Tipo{renderSortIcon('type')}</th>
            <th onClick={() => handleSort('side')}>Side{renderSortIcon('side')}</th>
            <th onClick={() => handleSort('orderPrice')}>Preço{renderSortIcon('orderPrice')}</th>
            <th onClick={() => handleSort('orderAmount')}>Quantidade{renderSortIcon('orderAmount')}</th>
            <th onClick={() => handleSort('executed')}>Executado{renderSortIcon('executed')}</th>
            <th onClick={() => handleSort('averagePrice')}>Preço Médio{renderSortIcon('averagePrice')}</th>
            <th onClick={() => handleSort('tradingTotal')}>Total{renderSortIcon('tradingTotal')}</th>
            <th onClick={() => handleSort('status')}>Status{renderSortIcon('status')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedRegistros.map((r, idx) => (
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
                <td>
                <Button variant="danger" size="sm" onClick={() => handleRemove(r.orderNo)}>
                  Remover
                </Button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </motion.div>
  );
};

export default RelatorioOrdemTabela;