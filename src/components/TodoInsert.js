//[세번째작업]컴포넌트에서 인풋에 입력하는 값을 관리할 수 있도록 useState를 사용하여 value라는 상태를 정의한다
import { useState, useCallback } from "react";
//[두번째작업]react-icons 라이브러리 가져다 사용하기 적용 {라이브러리 싸이트에서 icon이름 적용}
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";
//[컴포넌트설명]
// 1. 새로운 항목추가 | state를 통해 인풋의 상태를 관리하는 컴포넌트
// 2. 버튼에 react-icon 을 추가하여서 + 아이콘 추가
// 3. 컴포넌트에 스타일 적용

//[네번째작업 app.js에서 새로운 인풋값이 들어오는 state관리와 함수를 props로 전달받음 { onInsert }]
const TodoInsert = ({ onInsert }) => {
  //[세번째작업]인풋에 입력하는 값 상태관리 value 상태 정의
  const [value, setValue] = useState(""); // 초기값
  //[세번째작업]useCallback을 활용하여 함수를 재사용할수 있도록 만든다 라이프싸이클 hook
  //[세번째작업]input에 이벤트핸들링 설정 onChange 입력값 변경
  //[세번째작업]value라는 상태를 정의
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []); //[세번째작업] 1. []빈배열일시 함수 재사용 2. [] 배열안에 값이 있을시 input의 내용이 바뀌거나, 새로운 항목이 추가될때 새로 만들어진 함수를 사용하게 된다.

  //[네번째작업 버튼을 클릭하면 발생할 이벤트 설정]
  //onSubmit 함수가 호출되면 onInsert함수에(value)값을 넣고 호출하고 value 값을 초기화 한다.
  //onClick 이벤트를 사용할수 있지만 form을 이용해서 onSubmit을 사용한 이유는 onSubmit은 엔터도 같이 적용이 되는데 onClick은 엔터가 적용되지 않는다
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(""); // value 값 초기화
      //submit 이벤트는 브라우저에서 새로고침을 발생시킨다. 방지하기 위해서 함수를 호출시킴
      e.preventDefault();
    },
    [onInsert, value]
  );
  return (
    // form 버튼 클릭시 발생하는 이벤트 설정 onSubmit
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
