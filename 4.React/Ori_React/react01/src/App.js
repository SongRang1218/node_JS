import './App.css';

function App() {
    return (
        <div className="divA">
            <div className="divC">
                <aside>
                    <button>메뉴</button>
                </aside>
                <aside>메뉴</aside>
                <aside>메뉴</aside>
                <aside>메뉴</aside>
            </div>
            <div className="divB">
                <h1>게시판</h1>
                <table>
                    <tr>
                        <th>No.</th>
                        <th>제목</th>
                        <th>이름</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                    <tr className="ho1">
                        <td>1</td>
                        <td>동해번쩍 서해번쩍 은신술</td>
                        <td>홍길동</td>
                        <td>언제더라</td>
                        <td>3</td>
                    </tr>
                    <tr className="ho1">
                        <td>2</td>
                        <td>척준경의 검술가이드</td>
                        <td>척준경</td>
                        <td>고려시대</td>
                        <td>355312</td>
                    </tr>
                    <tr className="ho1">
                        <td>3</td>
                        <td>세종대왕이 알려주는 우리말</td>
                        <td>세종</td>
                        <td>조선시대</td>
                        <td>765311</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
const btn = () => alert('안녕하세요');
export default App;
