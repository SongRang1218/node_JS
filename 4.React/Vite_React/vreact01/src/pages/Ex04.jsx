import { useState } from 'react';
import data from './Ex03.js';

const Radio = () => {
    const [chk, setChk] = useState({});
    const handleChk = (e) => {
        const { value, checked } = e.target;
        setChk((prev) => ({ [value]: checked }));
    };
    return (
        <>
            <h1>4. 라디오확인</h1>
            {data.map((v, i) => {
                return (
                    <div key={i}>
                        <input type="radio" name="one" onChange={handleChk} value={v} />
                        {v} <br />
                    </div>
                );
            })}
            <h3>{JSON.stringify(chk)}</h3>
        </>
    );
};
export default Radio;
