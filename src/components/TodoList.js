//[[[컴포넌트 역할]
//[[[TodoListItem 컴포넌트를 불러와서 별도의 props 전달 없이 그대로 여러번 보여주고 있다 ]]]
//[[[기능을 추가하고 다양한 데이터를 전달할 것 ]]]
//[[[App.js에 설정된 기본데이터에 영향을 받을것을 React.memo를 사용해서 컴포넌트 성능 최적화를 적용시킴]]]
//[[[React-vitualized 라이브러리 적용시킨다 import에 useCallback과 List를 적용시킴]]]

import React, { useCallback } from "react";
import { List } from "react-virtualized";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";
//268~270 [App.js와 연결된 [일정항목에 대한 첫번째 기능 작업]]
//268~270 App컴포넌트에서 state 초기 셋팅한것을 props로 받아온다 --> todos객체데이터
//268~270 받아온 todos 배열을 [배열내장함수 map사용] TodoListItem으로 이루어진 배열로 변환하여 렌더링해준다

//279~280(Delete-onRemove)지우기 기능을 위하여  onRemove 함수를 app.js에서 만들어서 props로 받아와 해당컴포넌트를 겨쳐야 한다 TodoListItem 이루어진 배열로 변환한다 변환된 데이터 |key| 함수를 전달한다
//281~282(Update-onToggle)수정 기능을 위하여 onToggle 함수를 app.js에서 만들어서 props로 받아와 해당컴포넌트를 거쳐야 한다 TodoListItem 이루어진 배열로 변환한다 변환된 데이터 |key| 함수를 전달한다
const TodoList = ({ todos, onRemove, onToggle }) => {
  //305(React-virtualized 라이브러리 성능최적화 스크롤관련) 스크롤 안한 리스트는 9개인데 나머지도 다 렌더되고 있음 불필요한 렌더링을 막기 위해서 라이브러리 적용 스크롤해서 화면이 보여지는 목록만 렌더링됨
  //305(React-virtualized 라이브러리 성능최적화 스크롤관련) todoListItem을 렌더링할때 사용하기 위해서
  //305(React-virtualized 라이브러리 성능최적화 스크롤관련) 1.rowRenderer함수를 생성 2.해당함수를 props로 설정 전달 3.객체타입을 받아와서 사용한다{ index, key, style }
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        ></TodoListItem>
      );
    },
    [onRemove, onToggle, todos] //305(React-virtualized 라이브러리 성능최적화 스크롤관련) useCallback [값있을시] 함수내부의 기본 설정값들이 바뀌었을때 해당함수를 생성해 실행
  );
  return (
    //305(React-virtualized 라이브러리 성능최적화 스크롤관련) 해당 list컴포넌트를 사용할때 해당리스트의 |전체크기|각항목높이|각항목렌더링할때사용하는함수|배열을|props로 넣어주어야 한다
    //305(React-virtualized 라이브러리 성능최적화 스크롤관련) 이컴포넌트가 props로 전달받은 props를 사용하여 자동으로 최적화 해준다  -->
    <List
      className="TodoList"
      width={512} //전체크기
      height={513} //전체높이
      rowCount={todos.length} //항목개수
      rowHeight={57} //항목높이
      rowRenderer={rowRenderer} //항목을 렌더링 할때 쓰는 함수
      list={todos} //배열
      style={{ outline: "none" }} //list에 기본적용되는 outline 스타일제거
    ></List>

    //268~270 [일정항목에 대한 첫번째 기능 작업]App.js에서 todos 상태 사용하기
    //268~270 todos받은 데이터를 맵을 활용하여 새로운 배열로 변환을 한다 TodoListItem 이루어진 배열로 변환한다
    //268~270 props로 todo 데이터는 통째로 props로 전달하면서 변환할때 map을활용 변환할때 key를 사용하는데 고유값을 데이터의 id로 사용 key id를 props로 전달한다

    //279~280(Delete-onRemove)지우기 기능을 위하여  onRemove 함수를 app.js에서 만들어서 props로 해당컴포넌트를 겨쳐야 한다 props로 받아 TodoListItem 이루어진 배열로 변환한다 변환된 데이터를 전달한다 컴포넌트 이동 281

    // <div className="TodoList">
    //   {todos.map((todo) => (
    //     <TodoListItem
    //       todo={todo}
    //       key={todo.id} //268~270<TodoListItem todo={todo} key={todo.id} /> 변환작업후 TodoListItem 컴포넌트에 데이터 배열 전달
    //       onRemove={onRemove} //279(Delete-onRemove)지우기 기능을 위하여  onRemove 함수를 app.js에서 만들어서 props로 해당컴포넌트를 겨쳐야 한다 props로 받아 TodoListItem 이루어진 배열로 변환한다 변환된 데이터 |key| 함수를 전달한다 이동281 TodoListItem
    //       onToggle={onToggle} //281~282(Update-onToggle)수정 기능을 위하여 onToggle 함수를 app.js에서 만들어서 props로 받아와 해당컴포넌트를 거쳐야 한다 TodoListItem 이루어진 배열로 변환한다 변환된 데이터 |key| 함수를 전달한다 이동 238 TodoListItem
    //     />
    //   ))}
    // </div>
  );
};
//302(React.memo-컴포넌트성능최적화3) App.js 기본설정된 데이터가 update되면 영향을 받을수 있기때문 React.memo를 사용해 컴포넌트 최적화를 해두었다
//302(React.memo-컴포넌트성능최적화3) 부모컴포넌트인 App.js에서 props로 전달하는 외부 데이터의 값 기본설정된 배열데이터가 수정되면 리렌더링이 되는데, 불필요한 리렌더링을 React.memo로 방지한다
//리액트 virtualized 라이브러리 설치해서 스크롤관련 자원 낭비되는 불필요한 렌더링을 막기 위해서 라이브러리 설취뒤 ---> todoList.js 에서 적용시킴 304
export default React.memo(TodoList);
