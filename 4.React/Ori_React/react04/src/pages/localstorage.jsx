import {useState} from 'react'
const Lstorage = () => {
    let load = JSON.parse(localStorage.getItem('react04'))??[]
    /* 입력필드 값들*/
    const [data,setData] = useState({in1: '', in2: '', in3: ''})

    /* 입력 핸들러 */
    const handleInputs = e => {
        const {id, value} = e.target
        setData({...data,[id]:value}) // {id:1, name:'hong' , id:2}
    }
    /* 데이터 입력버튼 */
    const save = () =>{
        const updateArr = [...load, data]
        localStorage.setItem('react04',JSON.stringify(updateArr))
    }
    /* 데이터 읽기버튼 */
    /* 데이터 삭제버튼 */
    
    return <>
        <h1>3.로컬스토리지</h1>
        이름: <input id='in1' type="text" onChange={handleInputs} value={data.in1}/><br />
        나이: <input id='in2' type="text" onChange={handleInputs} value={data.in2}/><br />
        주소: <input id='in3' type="text" onChange={handleInputs} value={data.in3}/><br />
        <br />
        <button onClick={save} disabled={!(data.in1&&data.in2&&data.in3)}>저장하기</button>    
        <button>불러오기</button>    
        <button>삭제하기</button>   
        <hr /> 
        <div>{JSON.stringify(data)}</div>
    </>;
};
  export default Lstorage;