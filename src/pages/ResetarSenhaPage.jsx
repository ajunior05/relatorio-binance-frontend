import React, { useState } from 'react';

const ResetarSenhaPage = () => {
  const [email, setEmail] = useState('');

  const handleResetar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8090/api/usuarios/resetar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        alert('Se o email estiver cadastrado, um link de redefinição será enviado.');
      } else {
        alert('Erro ao solicitar redefinição.');
      }
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Resetar Senha</h2>
      <form onSubmit={handleResetar}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-warning">Enviar link de redefinição</button>
      </form>
    </div>
  );
};

export default ResetarSenhaPage;