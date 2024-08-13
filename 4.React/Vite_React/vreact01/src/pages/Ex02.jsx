import { useState } from "react";
const Sel = () => {
  const [sel, setSel] = useState("051");
  const selector = (e) => setSel(e.target.value);
  const city = ["서울", "부산", "광주", "대구", "대전", "제주"];
  const cNum = ["02", "051", "062", "053", "042", "064"];
  return (
    <>
      <h1>2. 셀렉터와 연동</h1>
      <h2>
        <div>{sel}</div>
      </h2>
      <select onChange={selector} value={sel}>
        {city.map((v, i) => (
          <option key={i} value={cNum[i]}>
            {v}
          </option>
        ))}
      </select>
      <h3>
        <pre>
          {`<select name="" id="">
            <option value="02">서울</option>
            <option value="051" selected>부산</option>
            <option value="062">광주</option>
            <option value="053">대구</option>
            <option value="042">대전</option>
            <option value="064">제주</option></select>`}
        </pre>
      </h3>
    </>
  );
};
export default Sel;
