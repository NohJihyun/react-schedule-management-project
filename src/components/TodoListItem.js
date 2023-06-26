//[[[컴포넌트 역할]]]
//[[[일정관리 항목 / 각기 할일 정보를 보여주는 ui]]]
//[[[todo 객체데이터를 props로 받아서 다른 상태의 스타일을 ui를 보여준다 ]]]
//[[[이벤트를 설정한후 실행하는 컴포넌트]]]

//[설명]
//1.다양한 icon을 가져다 사용했다 --> 나중에 할일이 완료되었을때 체크된 상태를 보여주기 위해 사용할 아이콘이다
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
} from "react-icons/md";
import cn from "classnames";
import "./TodoListItem.scss";
import React from "react";
//268~271 [일정항목에 대한 첫번째 기능 작업]
//268~271 App컴포넌트에서 초기상태값을 TodoList 컴포넌트에 전달해 Todos 객체데이터 배열을 변환하여 TodoListItem 컴포넌트에서 새로운 배열을 전달받은후 기능처리작업한다]
//268~271 조건부 스타일링을 위하여 classnames를 활용한다 check 일때 MdCheckBox | MdCheckBoxOutlineBlank 둘중하나 렌더 되는것 같다 삼항연산자 {} 안에 조건부를 작성한다
//268~271 작업이 마무리 된후에 항목추가 기능을 위해 Todoinsert 컴포넌트로 이동해서 작업한다 272 연결]]

//279~281(Delete-onRemove) onRemove함수를 props로 전달받아 {onRemove} 클릭이벤트 설정 삭제함수 적용 및 실행]
//281~283(Update-onToggle) onToggle함수를 props로 전달받아 {onToggle} onClick 이벤트 설정 수정함수 적용 및 실행]

//294(React.memo-컴포넌트성능최적화) App.js에서 props외부 데이터 변화가 없으면 리렌더링 되지 않게 React.memo 적용 TodoListItem 해당 컴포넌트를 감싸면 된다.

//305~306(React-virtualized 라이브러리 성능최적화 스크롤관련) 1.기존보여주던 화면 div로 한번감싸기 2. className 설정하기 3.props로 받아온 style 설정해주기
//305~306(React-virtualized 라이브러리 성능최적화 스크롤관련) 설정이 마무리 된후에 ---> TodoListItem.scss로 이동 307
const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo; //268~271 [일정항목에 대한 첫번째 기능 작업] 반환된 객체 todo 배열데이터에서 비구조분해 할당으로 text 와 checkd를 할당해서 작업한다
  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        {/*268~271 하위 div소스 반환된 todo객체데이터에서 text/check 기능처리 작업*/}
        {/*281~283(Update-onToggle) onToggle 수정처리 마무리*/}
        <div
          className={cn("checkbox", { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        {/*279~281(Delete-onRemove) onRemove props로 전달받아 {onRemove} 클릭이벤트 설정 삭제함수 적용 및 실행 클릭시 onRmove 함수기능이 작동된다 삭제 마무리 ---> 281수정기능(onToggle) */}
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};
//294(React.memo-컴포넌트성능최적화) React.memo 적용 | 컴포넌트 최적화 끝난게 아니다
//294(React.memo-컴포넌트성능최적화) todos 배열(기본값) 업데이트 되면 onToggle | onRemove 는 todos를 참조하고 있어서 todos배열이 업데이트(변경) 되면 onToggle | onRemove 함수가 새로 만들어진다
//294(React.memo-컴포넌트성능최적화) 함수가 새로 만들어지는것을 방지 | 1.useState 함수형 업데이트 기능을 사용하는것 | 2. useReducer를 사용하는것
//294(React.memo-컴포넌트성능최적화)  1.useState 함수형 업데이트 기능을 사용하는것 --> 이방법을 적용하기 위해서 295 useState 함수형 업데이트 작업으로 App.js로 컴포넌트 이동
export default React.memo(TodoListItem);
