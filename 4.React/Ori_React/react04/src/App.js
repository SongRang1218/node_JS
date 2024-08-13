import { Link, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import Cryp from './pages/crypto'
import Lstorage from './pages/localstorage'
import "./App.css";

const App = () => {
  return <>
  <Link to="/">Home</Link> |{' '}
  <Link to="/crypto">Crypto</Link> |{' '}
  <Link to="/localstorage">Local Storage</Link>
  <Routes>
    <Route path="/" element={<Home/> } />
    <Route path="/crypto" element={<Cryp/> } />
    <Route path="/localstorage" element={<Lstorage/> } />
  </Routes>
  </>;
};

export default App;
