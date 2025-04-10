import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavbarMenu = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
console.log("Auth?", isAuthenticated);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <NavLink to="/" className="navbar-brand">Relatorios da Binance</NavLink>
      <div className="ml-auto">
        {isAuthenticated ? (
          <>
            <NavLink to="/upload" className="btn btn-outline-primary mx-2">Upload</NavLink>
            <NavLink to="/consultarOrdem" className="btn btn-outline-success mx-2">Consultar Ordem</NavLink>
            <NavLink to="/consultarTransacao" className="btn btn-outline-success mx-2">Consultar Transação</NavLink>
            <Button variant="danger" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-outline-primary mx-2">Login</NavLink>
            <NavLink to="/cadastrar" className="btn btn-outline-success mx-2">Cadastrar</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarMenu;