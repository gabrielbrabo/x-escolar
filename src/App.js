import React, { useState } from 'react';
import AppRoutes from "./AppRoutes";
import './App.css';

//import { Title } from './components/Title';
import { NavBar } from './components/NavBar';
import { Header } from './components/Header';

import { DiReact } from "react-icons/di";

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
        <div className="logo"><DiReact style={{
          //color: "#61dafb", // Cor padrão do React
          filter: "drop-shadow(0 0 5px #ffffff)", // Efeito na bolinha (não é exato)
        }} /> Diário Escolar Virtual</div>
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
