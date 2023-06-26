//[[[해당 컴포넌트 역할  ]]]
//[[[새로운 항목을 입력하고 추가할수 있는 컴포넌트 이다. state를 통하여 input 상태를 관리한다 ]]]
//[[[버튼에 react-icon 을 추가하여서 + 아이콘 추가]]]
//[[[TodoInsert.scss스타일링 컴포넌트에 스타일 적용]]]
//[[[272쪽(insert) 일정 항목을 추가하는 기능을 구현한다]]]

//[[[272쪽(insert-입력값state변경) 일정 항목을 추가하는 기능을 구현한다 useState todo배열에 새로운 객체 추가 작업및 만든 함수를 재사용 하기 위혀서 useCallback를 사용한다 ]]]
import { useState, useCallback } from "react";
//[[[260쪽 react-icons 라이브러리 가져다 사용하기 적용 {라이브러리 싸이트에서 icon이름 적용]]]
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";

//276쪽(insert-함수실행) App.js에서 새로운 인풋값이 들어오는 state관리와 onInsert함수를 props로 전달받음 { onInsert }]
const TodoInsert = ({ onInsert }) => {
  //[[[272쪽(insert-입력값state변경) 인풋에 입력하는 값 상태관리 value 상태 정의 useState 상태관리]]]
  const [value, setValue] = useState(""); // 상태정의 | 기본값 빈문자열
  //[[[272쪽(insert-입력값state변경)성능최적화를 하기위해서 함수를 재사용하게 useCallback을 사용함]]]
  //[[[272쪽(insert-입력값state변경)useCallback 1.[]빈배열일시 함수 재사용 2. [] 배열안에 값이 있을시 input의 내용이 바뀌거나, 새로운 항목이 추가될때 새로 만들어진 함수를 사용하게 된다. ]]]
  //[[[272쪽(insert-입력값state변경)useState 상태가 정의된 상태에서 이벤트 핸들링 설정된후 input에 입력갑이 들어오면 onchange함수가 실행되면서 셋팅된 값으로 변경된다 ]]]
  const onChange = useCallback((e) => {
    setValue(e.target.value); //(e.target.value) 변할인풋값 e event객체
  }, []);

  //276쪽(insert-함수실행-onSubmit) 버튼을 클릭하면 발생할 이벤트 설정 onSubmit
  //276쪽(insert-함수실행-onSubmit) onSubmit 함수가 호출되면 onInsert함수에(value)값을 넣고 호출하고 value 값을 초기화 한다.
  //276쪽(insert-함수실행-onSubmit) onClick 이벤트를 사용할수 있지만 form을 이용해서 onSubmit을 사용한 이유는 onSubmit은 엔터도 같이 적용이 되는데 onClick은 엔터가 적용되지 않는다 -onkeypress로직이추가필요
  //276쪽(insert-함수실행-onSubmit) onSubmit 함수를 만들고 jsx form을 활용 onSubmit으로 설정함 이벤트헨들링
  //276쪽(insert-함수실행-onSubmit) useCallback을 사용 [] 1.함수재사용 [값]2.인풋내용변화,새로운항목추가 항목데이터 적용되는 상황
  const onSubmit = useCallback(
    (e) => {
      onInsert(value); //276쪽(insert-함수실행-onSubmit) input으로 들어오는 현재값 상태를 받아옴
      setValue(""); //276쪽(insert-함수실행-onSubmit) value 값 초기화
      //276쪽(insert-함수실행-onSubmit) submit 이벤트는 브라우저에서 새로고침을 발생시킨다. 방지하기 위해서 함수를 호출시킴
      e.preventDefault(); //새로고침 방지
    },
    //276쪽(insert-함수실행-onSubmit) 목록추가 함수와 input의 현재값이 바뀔때 onSubmit 함수를 실행해서 목록을 추가 시킨다
    //276쪽(insert-함수실행-onSubmit) useCallback 컴포넌트 성능최적화 [값있을시] 함수내부에서 상태값에 의존할때 | 인풋내용변화 | 항목추가시 새로운 함수를 사용하게 된다
    //276쪽(insert-함수실행-onSubmit) [*이해가필요한 부분] | onInsert함수와 value 값이 바뀌면 컴포넌트 성능최적화를 위해서 onSubmit 새로 만든 이함수가 실행이 된다
    [onInsert, value]
  );
  return (
    //276쪽(insert--함수실행-onSubmit) form 버튼 클릭시 onSubmit 발생 이벤트 설정 끝 --> 책279 Delete(onRemover)작업 --> App.js 컴포넌트로 이동
    <form className="TodoInsert" onSubmit={onSubmit}>
      {/*272쪽 입력값 변경-->변경값 확인후 275쪽 insert 등록작업으로 App.js로 넘어감*/}
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
