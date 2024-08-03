import React, { useState } from 'react';
import AppRoutes from "./AppRoutes";
import './App.css';

import { Title } from './components/Title';
import { NavBar } from './components/NavBar';
import { Header } from './components/Header';

const AuthenticatedApp = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  return (
    <>
      <NavBar
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
      <Header setMenuIsVisible={setMenuIsVisible} />
    </>
  )
};

export function App() {
  const token = sessionStorage.getItem("token");
  //const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <div className="app">
      {token ? (
        <>
          <AuthenticatedApp />
        </>
      ) : (
        <Title>
          <h1>ESCOLA X</h1>
        </Title>
      )}
      <div className="container">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
