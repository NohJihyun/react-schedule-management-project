//[일정등록미니프로젝트 컴포넌트 설명]
//TodoTemplate 컴포넌트 화면가운데 정렬, 앱타이틀(일정관리)를 보여준다 children으로 내부 jsx를 props로 받아와서 렌더링
//TodoInsert 컴포넌트    | 새로운 항목추가 | state를 통해 input의 상태를 관리하는 컴포넌트
//TodoList 컴포넌트 | 기능을 추가 | 다양한 데이터를 전달할것 | 변환후 TodoListItem 컴포넌트가 받아서 각할일 보여준다
//TodoListItem 컴포넌트 | 각할일 정보보여주기 | todo 객체 props로 받아서 상태에 따른 스타일 ui 만들어주기
//App.js 컴포넌트 | 추가할 일정 항목에 대한 상태 state 를 관리한다 |useMemo| useState함수형업데이트 정의후 업데이트함수적용 | useReducer 사용해 함수가 바뀌지 않음 컴포넌트성능최적화 작업

//import logo from "./logo.svg";
//import "./App.css";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import { useReducer, useState, useCallback, useRef } from "react";

//269 [첫번째 기능작업 todos상태정의, checkbox, text 출력]
//269 useState를 사용하여 todos라는 상태를 정의하고 , 정의된 기본값 todos를 [객체데이터 배열을] TodoList의 props로 전달한다

//275(insert-객체추가함수생성) 입력값(state) 변경후 insert 작업]
//275(insert-객체추가함수생성) todos 배열에 새 객체를 추가하는 onInsert 함수를 만들어본다
//275(insert-객체추가함수생성) onInsert 함수는 컴포넌트의 성능을 아낄수 있도록 useCallback으로 감싸준다
//275(insert-객체추가함수생성) props로 전달해야 할 함수를 만들때는 useCallback을 사용하여 함수를 감싸는 것을 습관해 해야 한다.

//                               (React.memo-컴포넌트성능최적화) 많은 데이터 추가해서 Test 및 성능모니터링
//289(컴포넌트 성능최적화-많은 데이터 렌더링) createBulkTodos()를 이이용해 데이터 추가
//289(컴포넌트 성능최적화-많은 데이터 렌더링) 2500데이터 속도가 느려짐 크롬개발자도구를 통해 성능모니터링 291 ~292
//289(컴포넌트 성능최적화-많은 데이터 렌더링) 성능모니터링 291 ~292 개발자도구 profiler로 성능확인 랭크차트아이콘은 리렌더링 오래걸린순으로 나열해준다
//289(컴포넌트 성능최적화-많은 데이터 렌더링) 느려지는 원인 1.전달받은 props가 변경될때 2. state가 바뀔때 3.#정답 부모컴포넌트가 리렌더링될때 4.forceUpdate 함수가 실행될때 | 해결 하단 React.memo 사용법

//                                     (React.memo-컴포넌트성능최적화) TodoListItem 컴포넌트에 적용
//293(React.memo-컴포넌트성능최적화1) 함수컴포넌트의 props가 바뀌지 않았다면 리렌더링하지 않도록 설정한다
//293(React.memo-컴포넌트성능최적화1) React.momo 사용법 컴포넌트를 감싸주면 된다 TodoListItem.js 하단에 export로 내보낼때 감싸줌
//293(React.memo-컴포넌트성능최적화1) App.js 부모컴포넌트에서 props로 받은것들이 바뀌지만 않으면 성능최적화가 된다 --> 리렌더링 되지 않게 컴포넌트를 감싸면 된다
//293(React.memo-컴포넌트성능최적화1) [[[(React.memo-컴포넌트성능최적화) 적용 TodoListItem 컴포넌트에 적용으로 ---> TodoListItem 컴포넌트로 이동 294 ]]]

//                                     (1.useState함수형업데이트|2.useReduce-컴포넌트성능최적화2) todos배열 참조 배열값 수정시 함수 새로만듬을 방지 함수유지 하는방법
//298(useReducer 컴포넌트성능최적화2) 소스에 적용[하단참고]
//298(useReducer 컴포넌트성능최적화2) useReducer 1.reducer만들고 dispact action값을 전달받아서 reduce를 호출해서 사용하는 개념 2.상태를 업데이트 하는 로직을 모아서 컴포넌트 밖으로 뺄수있다는 장점이 있다
//298(useReducer 컴포넌트성능최적화2) 함수유지 할때 1.useState함수형업데이트 2.useReducer 성능은 비슷해서 선택해서 사용하면 된다
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: 1,
      text: `할 일 ${i}`, //289 리터럴문법 `` 문자열 및 자바스크립트 레퍼런스 넣어주기
      checked: false,
    });
  }
  return array;
}
//298(useReducer 컴포넌트성능최적화2) 적용 | 1.useState함수형업데이트방법 2. useReducer를 사용할지 개발자가 선택한다
//298(useReducer 컴포넌트성능최적화2) todoReducer 함수를 만들어 action 업데이트정보를 담아서 전달 useReducer에서  dipatche로 action을 실행 reducer() 함수를 호출해서 사용
function todoReducer(todos, action) {
  switch (action.type) {
    // 새로 추가  {type:'INSERT', todo:{id:1, text: 'todo', checked: false}}
    case "INSERT":
      return todos.concat(action.todo);
    // 제거 { type: 'REMOVE', id:1 }
    case "REMOVE":
      return todos.filter((todo) => todo.id !== action.id);
    // 수정(토글)  { type: 'REMOVE', id:1 }
    case "TOGGLE":
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checkd } : todo
      );
    default:
      return todos;
  }
}

//289(컴포넌트성능최적화1-많은 데이터 렌더링) 기존 useState([ 기본값(데이터)설정을 -->useState(createBulkTodos()) 리렌더링될때 함수호출 | useState(createBulkTodos)설정 파라미터형태면 처음 렌더링 될때만 함수가 실행
const App = () => {
  //298(useReducer 컴포넌트성능최적화2) useReducer를 사용할때 2번째 파라미터 값을 기본값 초기상태로 설정해줘야 한다
  //298(useReducer 컴포넌트성능최적화2) 2번째 파라미터 값을 undefined 정의하지 않음 | 3번째 파라미터 초기상태를 만들어 주는 함수인 createBulkTodos 넣어줌 컴포넌트가 맨처음 렌더링 될때만 함수를 호출한다
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 기존소스 const [todos, setTodos] = useState(createBulkTodos); //useState(createBulkTodos)설정 파라미터형태면 처음 렌더링 될때만 함수가 실행

  //[첫번째작업]
  // 초기상태값 | 상태정의
  // { } 객체데이터 , 데이터를 담고있는 틀만들기 | 객체에는 각 항목의 고유 id / 내용 / 완료여부 값
  // [기능추가작업-할일목록]
  // 이배열은 TodoList에 props로 전달이 된다 TodoList에서 값을 받은후 TodoItem으로 변환하여 렌더링 하도록 설정한다
  //   {
  //     id: 1,
  //     text: "리액트의 기초 알아보기",
  //     checkd: true,
  //   },
  //   {
  //     id: 2,
  //     text: "컴포넌트의 스타일링 해보기",
  //     checkd: true,
  //   },
  //   {
  //     id: 3,
  //     text: "일정 관리 앱 만들어보기",
  //     checkd: false,
  //   },
  // ]);

  //275(insert-객체추가함수생성) insert 함수작업
  //275(insert-객체추가함수생성) oninsert 함수 | 새로운 객체를 만들때 마다 id값 1씩 더한다
  //275(insert-객체추가함수생성) 고윳값으로 사용될 id가 4가 된다
  //275(insert-객체추가함수생성) useRef를 사용하여 변수 담기 이유는 렌더링 되는 컴포넌트 정보가 아닌, 단순한 id를 참조하기 위해서 id를 변수에 넣는 과정을 뜻한다
  //275(insert-객체추가함수생성) Ref는 render 메서드에서 생성된 DOM 노드나 React 엘리먼트에 접근하는 방법을 제공합니다.
  const nextId = useRef(2500); //useRef(4);

  //275(insert-객체추가함수생성) props로 전달되는 함수는 useCallback 으로 감싸서 성능 최적화를 시킨다
  //275(insert-객체추가함수생성) useCallback : 컴포넌트 성능최적화 | [] 빈배열 만든함수를 재사용 | [값이있을시] : 값이 바뀌었을때 함수를 새로 생성해야 하는지 명시해야 한다
  //275(insert-객체추가함수생성) [값이있을시] : 인풋내용이바뀌거나 새로운 항목이 추가될때 새로 만들어진 함수를 사용하게 된다
  //275(insert-객체추가함수생성) [todos] : 기존 배열 데이터에 추가가 되기때문에 todos 배열 객체데이터를 넣어준다
  const onInsert = useCallback(
    // 등록할때 텍스트가 들어온다 텍스트가 들어오면서 새로운 객체로 추가가 된다
    (text) => {
      //275(insert-객체추가함수생성) 새로운객체 항목추가
      const todo = {
        id: nextId.current,
        text,
        checkd: false,
      };
      //275(insert-객체추가함수생성) 기존소스 setTodos(todos.concat(todo)); | concat 배열의 문자열 데이터를 기존데이터에 하나의 문자열로 합쳐서 데이터가공
      //295(컴포넌트성능최적화2 1.useState함수형업데이트)setTodos 사용시 어떻게 업데이트할지 정의해주는 업데이트함수 (todos) => 넣어주면 된다
      //295(컴포넌트성능최적화2 1.useState함수형업데이트)todos를 참조한 함수들이 todos가 업데이트 될때마다 함수가 계속 생성하는것을 방지한다 적용!

      //setTodos((todos) => todos.concat(todo)); --> 기존소스 useReducer 적용으로 주석처리함
      //298(useReducer 컴포넌트성능최적화2) ACTION으로 받아와서 dispatch로 action을 실행 ruduce 호출개념
      dispatch({ type: "INSERT", todo });
      nextId.current += 1; //current: 접근
    },
    //275(insert-객체추가함수생성) [todos] 인풋내용이바뀌거나 새로운 항목이 추가될때 새로 만들어진 함수를 사용하게 된다 --> 새로만들어진 onInsert 함수가 실행된다
    []
  );
  //279(Delete-onRemove) todos 배열데이터에서 id로 항목지우기
  //279(Delete-onRemove) 배열 내장함수인 filter() 를 사용 기존배열을 그대로 유지 특정조건으로 원소만 따로 추출하여 새로운 배열을 만든다 반환 ture 새로운 배열에 포함됨
  const onRemove = useCallback(
    //279(Delete-onRemove) id를 파라미터로 받아와서 기존todos 데이터에서 원소를 제거하는데 filter()사용하였고 조건은 기존데이터 id 새로운데이터 id 불일치시 삭제되게 함수기능생성
    (id) => {
      //295(컴포넌트성능최적화2 1.useState함수형업데이트)setTodos 사용시 어떻게 업데이트할지 정의해주는 업데이트함수 (todos) => 넣어주면 된다
      //295(컴포넌트성능최적화2 1.useState함수형업데이트)todos를 참조한 함수들이 todos가 업데이트 될때마다 함수가 계속 생성하는것을 방지한다 적용!

      //setTodos((todos) => todos.filter((todo) => todo.id !== id));

      //298(useReducer 컴포넌트성능최적화2) ACTION으로 받아와서 dispatch로 action을 실행 ruduce 호출개념
      dispatch({ type: "REMOVE", id });
    },
    //279(Delete-onRemove) 기존소스는[todos] --> todos인 이유는 useCallback을 사용할때 함수내부의 상태값을 의존하면 명시해야 하는데 기존에 설정된 todos 데이터를 사용하기때문에 todos 명시함
    []
  );
  //281~282(Update-onToggle) 수정 map을 사용하여 특정 id를 가지고 있는 객체의 checked값을 반전시킴 삼항연산자를 사용 map을통한 배열에서 변화가 필요한 원소만 작업
  //281~282(Update-onToggle) 즉 id를 비교 id가 같을때 checked 반전시키고 새로운 객체를 만들어 수정하고 id가 다를때 그대로 유지한다
  const onToggle = useCallback(
    //281~282(Update-onToggle) 현재 파라미터로 사용된 id를 받아
    (id) => {
      //295(컴포넌트성능최적화2 1.useState함수형업데이트)setTodos 사용시 어떻게 업데이트할지 정의해주는 업데이트함수 (todos) => 넣어주면 된다
      //295(컴포넌트성능최적화2 1.useState함수형업데이트)todos를 참조한 함수들이 todos가 업데이트 될때마다 함수가 계속 생성하는것을 방지한다 적용! --> 298 첫번째 방식1.useState함수형업데이트정의끝 2방식App.js useReducer 이동

      //setTodos((todos) =>
      //todos.map(
      //281~282(Update-onToggle) 기존설정된 데이터에 todo 배열로 객체데이터 추가 기존id 추가된id 값을 비교 같을때 checkd 반전시키고 새로운 객체를 생성해서 수정 id 값이 다를때 기존그대로 유지
      //(todo) =>
      //todo.id === id ? { ...todo, checked: !todo.checked } : todo //281~282(Update-onToggle) 삼항연산자 조건todo.id===id | 새로운객체생성(...spread 객체사본) | id값이다를때 처음받은 그대로 todo
      //)
      //);

      //298(useReducer 컴포넌트성능최적화2) ACTION으로 받아와서 dispatch로 action을 실행 ruduce 호출개념 -->> 함수 새로생성 방지 마무리후 --> TodoList.js에도 컴포넌트 성능최적화 이동 302
      dispatch({ type: "TOGGLE", id });
    },
    //[todos] 281~282(Update-onToggle)
    []
  );

  return (
    <TodoTemplate>
      {/*(275-객체추가함수생성) 만든insert함수를 TodoInsert 컴포넌트로 전달 insert 등록 마무리후 ---> 276 이벤트 설정으로 TodoInsert 컴포넌트로 이동  */}
      <TodoInsert onInsert={onInsert} />{" "}
      {/*279(Delete-onRemove) 현App컴포넌트에서 함수onRemove기능을 TodoList컴포넌트에 props로 전달 --> 280 TodoList컴포넌트로 이동 onRemove기능 받아 TodoListItem 이루어진 배열로 반환해 todo로 데이터/key:고유값/함수 전달*/}
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      {/*281~282(Update-onToggle) 구현된함수를 삭제와 같은 방식으로 Todlist컴포넌트에 props로 전달 --> 283 TodoList컴포넌트로 이동 onToggle기능 받아 TodoListItem 이루어진 배열로 반환해 todo로 데이터/key:고유값/함수 전달 */}
    </TodoTemplate>
  );
};

export default App;
