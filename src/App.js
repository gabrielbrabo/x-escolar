import AppRoutes from "./AppRoutes";
import './App.css';
import { useState } from 'react';

import {
  Title,
} from './components/Title';

import {NavBar} from './components/NavBar';
import {Header} from './components/Header';


export function App() {

  const token = sessionStorage.getItem("token")
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <div className="app">
      <Title>
        <h1>X ESCOLAR</h1>
      </Title>
      {
        token 
          && 
        <NavBar
          menuIsVisible={menuIsVisible}
          setMenuIsVisible={setMenuIsVisible}
        />
      }
      {
        token 
        && 
        <Header setMenuIsVisible={setMenuIsVisible}/>
      }
      <div className="container">
        <AppRoutes/>
      </div>
      
    </div>
  );
}

export default App;
