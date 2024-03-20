import AppRoutes from "./AppRoutes";
import './App.css';

import {
  Title,
} from './components/Title';

import NavBar from './components/NavBar';


function App() {

  const token = sessionStorage.getItem("token")

  return (
    <div className="app">
      <Title>X ESCOLAR</Title>
      <div className="container">
       {token && <NavBar/>}
        <AppRoutes/>
      </div>
      
    </div>
  );
}

export default App;
