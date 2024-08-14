import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Inp from './pages/Ex01';
import Sel from './pages/Ex02';
import Check from './pages/Ex03.jsx';
import Radio from './pages/Ex04';
import Arrays from './pages/Ex05';
import CSS from './pages/Ex06';
import Home from './pages/Home';

function App() {
    return (
        <>
            <Link to="/">Home</Link> | <Link to="/ex01">예제1</Link> | <Link to="/ex02">예제2</Link> |{' '}
            <Link to="/ex03">예제3</Link> | <Link to="/ex04">예제4</Link> | <Link to="/ex05">예제5</Link> |{' '}
            <Link to="/ex06">예제6</Link>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ex01" element={<Inp />} />
                <Route path="/ex02" element={<Sel />} />
                <Route path="/ex03" element={<Check />} />
                <Route path="/ex04" element={<Radio />} />
                <Route path="/ex05" element={<Arrays />} />
                <Route path="/ex05" element={<CSS />} />
            </Routes>
        </>
    );
}

export default App;
