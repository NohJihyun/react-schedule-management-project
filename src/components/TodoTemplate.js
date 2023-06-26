//[[컴포넌트설명]]
//화면을 가운데에 정렬시켜주며, 앱타이틀(일정관리)를 보여준다 //컴포넌트 스타일 적용 scss
//children으로 내부 jsx를 props로 받아 와서 렌더링 해준다
//초기셋팅 App.js 에서 컴포넌트 태그사이의 내용을 보여주는 props로 Todo App을 만들자 children 전달
import "./TodoTemplate.scss";
//현 컴포넌트에서 children으로 받아서 화면에 표출
const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
