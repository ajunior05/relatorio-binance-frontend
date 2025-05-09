import React, { useState } from 'react';
import API_BASE_URL from '../config/api';

const CadastroPage = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/usuarios/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
      } else {
        alert('Erro ao cadastrar!');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <div className="mb-3">
         <label>Nome</label>
         <input type="text" className="form-control" value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Senha</label>
          <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPage;