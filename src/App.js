import React, { useState } from 'react';
import AppRoutes from "./AppRoutes";
import './App.css';

//import { Title } from './components/Title';
import { NavBar } from './components/NavBar';
import { Header } from './components/Header';

import logo from "./assests/logoDev.png"

const AuthenticatedApp = () => {
  const token = sessionStorage.getItem("token");
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  return (
    <>
      {token ? (
        <>
          <NavBar
            menuIsVisible={menuIsVisible}
            setMenuIsVisible={setMenuIsVisible}
          />
          <Header setMenuIsVisible={setMenuIsVisible} />
        </>
      ) : (
        <div className="logo"><img src={logo} alt="Logo do Sistema" width="150" /> Diario Escolar Virtual</div>
      )}
    </>
  )
};

export function App() {
  return (
    <div className="app">
      <AuthenticatedApp />
      <div className="container">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
