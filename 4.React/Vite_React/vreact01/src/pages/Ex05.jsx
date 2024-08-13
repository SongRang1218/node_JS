import { useState } from 'react';
const Arrays = () => {
    const [arr, setArr] = useState('');
    let inData = '';
    const handleInput = (e) => (inData = e.target.value);
    const handleAdd = (e) => setArr([...arr, inData]);
    const handleDel = (e) => {};

    return (
        <>
            <h1>5. 어레이 실시간 추가</h1>
            <label htmlFor="inin">배열요소 입력 : </label>
            <input type="text" id="inin" onChange={handleInput} />
            <button onClick={handleAdd}>추가</button>
            <button onClick={handleDel}>제거</button>
            <h3>{arr}</h3>
        </>
    );
};
export default Arrays;
