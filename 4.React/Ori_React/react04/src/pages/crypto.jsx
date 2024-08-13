import {useState} from 'react'
import CryptoJS from 'crypto-js'

const Cryp = () => {
    const [oid, setOid] = useState('') // 아이디 입력부
    const [opw, setOpw] = useState('') // 패스워드 입력부
    const [encrypt, setEncrypt] = useState('') // 암호화값
    const [decrypt, setDecrypt] = useState('') // 복호화값
    const [skey, setKey] = useState('') // 암호화키 입력부
    const [sha, setSha] = useState('') // 단방향 암호화용
    const secretkey = '123456'
    /* 데이터 암호화 함수*/
    const encryptFn =() =>{
        const data = {id: oid, pw: opw}
        const encData = CryptoJS.AES.encrypt(JSON.stringify(data),skey).toString()
        setEncrypt(encData)}
    /* 데이터 복호화 함수*/
    const decryptFn =() =>{
        try{
            const bytes = CryptoJS.AES.decrypt(encrypt,skey)
            const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            setDecrypt(decrypted)
        }catch(error){
            console.error('복호화 오류', error)
            alert('복호화에 실패하였습니다. 암호키를 확인하세요.')
        }finally{
            alert('암호키 관리에 주의하세요.')
        }
    }
    /* 데이터 단방향 함수*/
    const sha256Fn =() =>{
        const data = {id: oid, pw: opw}
        const encData = CryptoJS.SHA256(JSON.stringify(data)).toString()
        setSha(encData)
    }
    /* 아이디값 핸들러*/
    const handleIdChange = e => setOid(e.target.value)
    /* 비밀번호값 핸들러*/
    const handlePwChange =e => setOpw(e.target.value)
    /* 입력 암호키 핸들러*/
    const handleKeyInput =e => setKey(e.target.value)
    /* 복호화 암호키 핸들러*/
    const handleKeyChange =e => setKey(e.target.value)
    return <>
        <h1>2.암호화,복호화,단방향</h1>
        <div>
            ID : <input type="text" onChange={handleIdChange} value={oid}/>
        </div>
        <div>
            PW : <input type="password" onChange={handlePwChange} value={opw}/>
        </div>
        <div>
            암호화키 : <input type="password" onChange={handleKeyInput} />
        </div>
        <button onClick={encryptFn} disabled={!(oid&&opw)}>암호화</button>
        <hr />
        <div>
            암호화전: {(oid&&opw)&&JSON.stringify({id: oid, pw: opw})}
        </div>
        <br />
        <div>암호화후: {(oid&&opw)&&`${encrypt} 글자수:(${encrypt.length})`}</div>
        <br />
        <hr />
        <div>복호화 암호키:
            <input type="password" onChange={handleKeyChange}  />
        </div>
        <button onClick={decryptFn} disabled={!(skey&&oid&&opw)}>복호화</button>
        <div>{decrypt&&JSON.stringify(decrypt)}</div>
        <div>
          {decrypt &&
            `복호화된 데이터: Id는 ${decrypt.id}이고, Password 는 ${decrypt.pw}입니다.`}
        </div>
        <hr />
        <button onClick={sha256Fn}>단방향 암호화하기</button>
        <h3>{sha && `SHA256암호화: ${sha} (길이:${sha.length})`}</h3>
    </>;
};
  export default Cryp;