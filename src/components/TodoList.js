//[컴포넌트 역할]
//1.TodoListItem 컴포넌트를 불러와서 별도의 props 전달 없이 그대로 여러번 보여주고 있는데
//2. 기능을 추가하고 다양한 데이터를 전달할 것입니다.
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";
//[기능추가작업-할일목록]
//App컴포넌트에서 state 초기 셋팅한것을 props로 받아온다
//받아온 todos 배열을 [배열내장함수 map사용] TodoListItem으로 이루어진 배열로 변환하여 렌더링해준다

//[지우기 기능을 위하여 책 279 onRemove 함수를 app.js에서 만들어서 props로 해당컴포넌트를 겨쳐야 한다 props로 받아 그대로 전달한다]
//[수정 기능을 위하여 책 283 onToggle 함수를 app.js 에서 만들어서 props로 해당컴포넌트를 거쳐야 한다 props로 받아 그대로 전달한다]
const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    //todos받은 데이터를 맵을 활용하여 새로운 배열로 변환을 한다 TodoListItem 이루어진 배열로 변환한다
    //props로 todo 데이터는 통째로 props로 전달하면서 변환할때 map을활용 변환할때 key를 사용하는데 고유값을 데이터의 id로 사용
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
