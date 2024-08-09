import './App.css';
import { useState } from 'react';
import Join from './pages/join.jsx';
function App() {
    const [text, setText] = useState('');
    const handleInput = (e) => setText(e.target.value);

    return (
        <div>
            <form>
                <div>리액트 시작 03</div>
                <input type="text" onChange={handleInput} />
                <h3>{text}</h3>
                <button type="delete">지우기</button>
                <button type="reset">지우기</button>
            </form>
        </div>
    );
}

export default App;
