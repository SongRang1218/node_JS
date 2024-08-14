import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CSS from './pages/Ex06';
import Eff from './pages/Ex07';
// import Eff from './pages/Ex08';
// import Eff from './pages/Ex09';
// import Eff from './pages/Ex10';

import Home from './pages/Home';

function App() {
    return (
        <>
            <Link to="/">Home</Link> | <Link to="/ex06">예제6</Link> | <Link to="/ex07">예제7</Link>|{' '}
            <Link to="/ex08">예제8</Link> | <Link to="/ex09">예제9</Link> | <Link to="/ex10">예제10</Link>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ex06" element={<CSS />} />
                <Route path="/ex07" element={<Eff />} />
                {/* <Route path="/ex08" element={< />} />
                <Route path="/ex09" element={< />} />
                <Route path="/ex10" element={< />} /> */}
            </Routes>
        </>
    );
}

export default App;
