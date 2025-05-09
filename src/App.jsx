// src/App.jsx
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarMenu from './components/NavbarMenu';
import Home from './pages/Home';
import UploadPage from './pages/UploadPage';
import ConsultaPage from './pages/ConsultaPage';
import ConsultaTransacaoPage from './pages/ConsultaTransacaoPage';
import ConsultaNomadPage from './pages/ConsultaNomadPage';
import ConsultaParesPage from './pages/ConsultaParesPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import ResetarSenhaPage from './pages/ResetarSenhaPage';
import { AuthProvider, AuthContext } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_BASE_URL from './config/api';

const AppContent = () => {
  const [registros, setRegistros] = useState([]);
  const { logout, token } = useContext(AuthContext);

  const carregarTodos = async () => {
      console.log("Login com token:", token);
    const response = await fetch(`${API_BASE_URL}/api/consultarOrdem`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setRegistros(data);
    } else if (response.status === 403) {
      toast.error("Sessão expirada. Faça login novamente.");
      logout();
    } else {
      console.error("Erro ao carregar registros", response.status);
    }
  };

  useEffect(() => {
    if (token) {
     // carregarTodos();
    }
  }, [token]);

const handleUpload = async (file, tipoRelatorio,corretora) => {
  const formData = new FormData();
  formData.append('arquivo', file);

  // Define rota com base no tipo selecionado
  let endpoint;

  if (corretora === 'binance') {
    endpoint =
      tipoRelatorio === 'transacao'
        ? `${API_BASE_URL}/api/importarTransacao`
        : `${API_BASE_URL}/api/importarOrdem`;
  } else if (corretora === 'nomad') {
    endpoint =`${API_BASE_URL}/api/importarNomad`;
  } else {
    toast.error('Corretora não selecionada ou inválida.');
    return;
  }
/*   const endpoint =
    tipoRelatorio === 'transacao'
      ? `${API_BASE_URL}/api/importarTransacao`
      : `${API_BASE_URL}/api/importarOrdem`; */

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formData,
  });

    if (response.ok) {
      const message = await response.text();
      toast.success(message);
      await carregarTodos();
    } else {
      const errorText = await response.text();
      console.error("Erro ao importar arquivo:", errorText);
      toast.error('Erro ao importar arquivo.');
    }
  };

  const handleFilter = async (filtros,tipo) => {
          const params = new URLSearchParams(filtros);
  // Define rota com base no tipo selecionado
  let endpoint;
        if ((tipo == 'transacao') || (tipo == 'ordem')) {
          endpoint =
            tipo === 'transacao'
              ? `${API_BASE_URL}/api/consultarTransacao`
              : `${API_BASE_URL}/api/consultarOrdem`;
        } else if (tipo === 'nomad') {
          endpoint =`${API_BASE_URL}/api/consultarNomad`;
        }  else if (tipo === 'pares') {
                    endpoint =`${API_BASE_URL}/api/consultarPares`;
        } else {
          toast.error('Corretora não selecionada ou inválida.');
          return;
        }
    const url = `${endpoint}?${params.toString()}`;
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setRegistros(data);
    } else if (response.status === 403) {
      toast.error("Sessão expirada. Faça login novamente.");
      logout();
    } else {
      console.error("Erro ao filtrar registros", response.status);
    }
  };


  return (
    <>
      <NavbarMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrar" element={<CadastroPage />} />
        <Route path="/resetar-senha" element={<ResetarSenhaPage />} />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadPage onUpload={handleUpload} />
            </PrivateRoute>
          }
        />
        <Route
          path="/consultarOrdem"
          element={
            <PrivateRoute>
              <ConsultaPage
                registros={registros}
                setRegistros={setRegistros}
                onFilter={handleFilter}
              />
            </PrivateRoute>
          }
        />
        <Route
            path="/consultarTransacao"
            element={
                <PrivateRoute>
                    <ConsultaTransacaoPage
                    registros={registros}
                    setRegistros={setRegistros}
                    onFilter={handleFilter}
                    />
                </PrivateRoute>
                  }
        />
        <Route
            path="/consultarNomad"
            element={
                <PrivateRoute>
                    <ConsultaNomadPage
                    registros={registros}
                    setRegistros={setRegistros}
                    onFilter={handleFilter}
                    />
                </PrivateRoute>
                  }
        />
        <Route
            path="/consultarPares"
            element={
                <PrivateRoute>
                    <ConsultaParesPage
                    registros={registros}
                    setRegistros={setRegistros}
                    onFilter={handleFilter}
                    />
                </PrivateRoute>
                  }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

// ✅ Envolvendo tudo com AuthProvider e Router
const App = () => (
  <Router>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </Router>
);

export default App;