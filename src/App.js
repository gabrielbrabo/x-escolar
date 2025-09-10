import React, { useState } from 'react';
import AppRoutes from "./AppRoutes";
import './App.css';

//import { Title } from './components/Title';
import { NavBar } from './components/NavBar';
import { Header } from './components/Header';

import { DiReact } from "react-icons/di";

import useSingleTab from "./hooks/useSingleTab"; // importe o hoo

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

  const isAnotherTabOpen = useSingleTab({ keysToClear: ["token", "userData"] }); // usa o hook aqui

  if (isAnotherTabOpen) {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}>
        <div style={{ background: "#fff", padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
          <h2>Atenção!</h2>
          <p>O sistema já está aberto em outra aba. Feche a outra aba para continuar.</p>
        </div>
      </div>
    );
  }

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
