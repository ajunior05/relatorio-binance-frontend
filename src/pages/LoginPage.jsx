import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext'; // ✅ Importa o contexto
import API_BASE_URL from '../config/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Usa o login do contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.warning('Preencha todos os campos!');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token); // ✅ Chama o login do contexto (que coloca o "Bearer", atualiza o estado, etc)
        toast.success('Login realizado!');
        navigate('/');
      } else {
        toast.error('Login inválido!');
      }
    } catch {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  return (
    <motion.div
      className="container mt-5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button className="btn btn-primary w-100" type="submit">Entrar</button>
        <p className="mt-3">
          Não tem uma conta? <a href="/cadastrar">Cadastre-se</a> ou <a href="/resetar-senha">Esqueceu a senha?</a>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginPage;