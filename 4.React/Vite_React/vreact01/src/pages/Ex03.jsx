import { useState } from 'react';
import list from './Ex03.js';

const Check = () => {
    const [chk, setChk] = useState({});
    const handleChk = (e) => {
        const { value, checked } = e.target;
        setChk((data) => ({ ...data, [value]: checked }));
        console.log(e.target.value);
    };

    return (
        <>
            <h1>3. 체크확인</h1>
            {list.map((v, i) => {
                return (
                    <div key={v}>
                        <input type="checkbox" onChange={handleChk} value={v} checked={chk[i]} />
                        {v} <br />
                    </div>
                );
            })}
            <h3>선택결과:{JSON.stringify(chk)}</h3>
            <h3>
                {list
                    .filter((key) => chk[key])
                    .map((v) => (
                        <span key={v}>{v}</span>
                    ))}
            </h3>
        </>
    );
};
export default Check;
