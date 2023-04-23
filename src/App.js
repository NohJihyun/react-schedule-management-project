//import logo from "./logo.svg";
//import "./App.css";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import { useState, useCallback, useRef } from "react";
//[App컴포넌트역할]
//TodoTemplate 컴포넌트 화면가운데 정렬, 앱타이틀(일정관리)를 보여준다 children으로 내부 jsx를 props로 받아와서 렌더링
//TodoInsert 컴포넌트    | 새로운 항목추가 | state를 통해 input의 상태를 관리하는 컴포넌트
//TodoListItem 컴포넌트 | 각할일 정보보여주기 | todo 객체 props로 받아서 다른 스타일 ui 만들어주기
//TodoList 컴포넌트 | 기능을 추가 | 다양한 데이터를 전달할것
//[첫번째작업]
// 추가할 일정 항목에 대한 상태 state 들은 모두 App 컴포넌트에서 관리하다.
// useState를 사용하여 todo라는 상태를 정의하고 , todo TodoList의 props로 전달해본다!!!
//[두번째작업]
//todos 배열에 새 객체를 추가하는 onInsert 함수를 만들어본다
//onInsert 함수는 컴포넌트의 성능을 아낄수 있도록 useCallback으로 감싸준다
//props로 전달해야 할 함수를 만들때는 useCallback을 사용하여 함수를 감싸는 것을 습관해 해야 한다.
const App = () => {
  const [todos, setTodos] = useState([
    //[첫번째작업]
    // 초기상태값
    // { } 객체데이터 , 데이터를 담고있는 틀만들기 | 객체에는 각 항목의 고유 id / 내용 / 완료여부 값
    // [기능추가작업-할일목록]
    // 이배열은 TodoList에 props로 전달이 된다 TodoList에서 값을 받은후 TodoItem으로 변환하여 렌더링 하도록 설정한다
    {
      id: 1,
      text: "리액트의 기초 알아보기",
      checkd: true,
    },
    {
      id: 2,
      text: "컴포넌트의 스타일링 해보기",
      checkd: true,
    },
    {
      id: 3,
      text: "일정 관리 앱 만들어보기",
      checkd: false,
    },
  ]);
  //[두번째작업]
  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);
  // oninsert 함수
  // props로 전달되는 함수는 useCallback 으로 감싸서 성능 최적화를 시킨다
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current, //current
        text,
        checkd: false,
      };
      setTodos(todos.concat(todo)); //concat 배열의 문자열 데이터를 기존데이터에 하나의 문자열로 합쳐서 데이터가공
      nextId.current += 1; //current
    },
    [todos] // usecallback [] 빈배열 함수재사용 [값] 값 있을시 input 내용바뀌거나, 새로운 항목이 추가될때 새로 만들어진 함수를 사용하게 된다.
  );
  //[세번째 작업 지우기 기능구현하기 todos 배열에서 id로 항목지우기]
  //id를 파라미터로 받아와서 같은 id 항목을 todos 배열에서 지우는 함수를 만든다
  //TodoList 컴포넌트를 거쳐야 하기때문에 props로 전달한다 함수를
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );
  //[네번째 작업 수정 기능 구현하기 onToggle 함수 사용 삭제와 비슷한 방식]
  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
