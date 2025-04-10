// src/App.jsx
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarMenu from './components/NavbarMenu';
import Home from './pages/Home';
import UploadPage from './pages/UploadPage';
import ConsultaPage from './pages/ConsultaPage';
import ConsultaTransacaoPage from './pages/ConsultaTransacaoPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import ResetarSenhaPage from './pages/ResetarSenhaPage';
import { AuthProvider, AuthContext } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
  const [registros, setRegistros] = useState([]);
  const { logout, token } = useContext(AuthContext);

  const carregarTodos = async () => {
      console.log("Login com token:", token);
    const response = await fetch('http://localhost:8090/api/consultarOrdem', {
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
      carregarTodos();
    }
  }, [token]);

const handleUpload = async (file, tipoRelatorio) => {
  const formData = new FormData();
  formData.append('arquivo', file);

  // Define rota com base no tipo selecionado
  const endpoint =
    tipoRelatorio === 'transacao'
      ? 'http://localhost:8090/api/importarTransacao'
      : 'http://localhost:8090/api/importarOrdem';

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
      const endpoint =
                    tipo === 'transacao'
                    ? "http://localhost:8090/api/consultarTransacao"
                    : "http://localhost:8090/api/consultarOrdem";
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