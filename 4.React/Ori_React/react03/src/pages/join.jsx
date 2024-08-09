import './join.css';
import Cryptojs from 'crypto-js';
import { useState } from 'react';
function Join() {
    const [oid, setId] = useState('');
    const [encrypt, setEncrypt] = useState('');
    const hashFunction = () => {
        const secretkey = '123456';
        const data = oid;
        const encrypted = Cryptojs.AES.encrypt(JSON.stringify(data), secretkey).toString();
        setEncrypt(encrypted);
    };
    const handle1 = (e) => {
        setId(e.target.value);
    };
    return (
        <div>
            <h3>입력값</h3>
            <input type="text" onChange={handle1} />
            <div style={{ color: 'blue', fontSize: '2rem' }}>암호화전:{oid} </div>
            <br />
            <button onClick={hashFunction}>암호화</button>
            <br />
            <div style={{ color: 'red', fontWeight: 'bold' }}>암호화후: {encrypt} </div>
        </div>
    );
}
export default Join;
