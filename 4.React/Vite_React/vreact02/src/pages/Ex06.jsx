import './Ex06.css';
import myStyle from './Ex06.module.css';
const CSS = () => {
    const style1 = { width: '200px', height: '200px', borderRadius: '10%', backgroundColor: 'Green' };

    return (
        <>
            <h1 id='"ex6-h1'>6. CSS 스타일 적용하기</h1>
            <div style={style1}></div>
            <div style={{ ...style1, backgroundColor: 'blue' }}></div>
            <div className={'ex6-div'}></div>
            <div className={myStyle['ex6-div']}>
                <ul>
                    <li>리스트</li>
                    {/* <li></li>
                    <li></li>
                    <li></li>
                    <li></li> */}
                </ul>
            </div>
        </>
    );
};
export default CSS;
