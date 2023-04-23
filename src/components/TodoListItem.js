// [컴포넌트 역할]
//1. 각기 할일의 정보를 보여주는 ui
//2. todo 객체를 props로 받아서 다른 스타일을 ui를 보여준다 [데이터가 초기리스트 화면에서 변할때 적용된 화면을 보여주는 컴포넌트]
//[설명]
//1.다양한 icon을 가져다 사용했다 --> 나중에 할일이 완료되었을때 체크된 상태를 보여주기 위해 사용할 아이콘이다
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
} from "react-icons/md";
import cn from "classnames";
import "./TodoListItem.scss";
//[기능추가작업-할일목록 책271 페이지]
//1.App컴포넌트에서 초기상태값을 TodoList 컴포넌트에 전달해 [변환하여 TodoListItem 컴포넌트에서 렌더링한다]
//2.조건부 스타일링을 위하여 classnames를 활용한다 check 일때 MdCheckBox | MdCheckBoxOutlineBlank 둘중하나 렌더 되는것 같다 삼항연산자 {} 안에 조건부를 작성한다

//[삭제기능 onRemove props로 전달받아 {onRemove} 클릭이벤트 설정 삭제함수 적용]
//[수정기능 onToggle props로 전달받아 {onToggle} 클릭이벤트 설정 수정함수 적용]
const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem">
      <div className={cn("checkbox", { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      {/* onclick기능 설정 삭제함수 적용 onRemove */}
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};
export default TodoListItem;
