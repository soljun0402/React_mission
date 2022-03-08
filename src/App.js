import React, {useState, useCallback} from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";
/*리액트 라이브러리에서 React를 가져오고, 
Component라는 클래스도 가져옴*/

export default function App() {
//const [변수 이름, State를 정하는 함수]

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");
  const [edited, setEdited ] = useState(false);

  const handleClick = useCallback(
    (id) => {
    let newTodoData = todoData.filter(data => data.id !== id)
    setTodoData(newTodoData);
  },
  [todoData]
  );

  const handleSubmit = (e) => {
  //form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();
  //새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
  //원래 있던 할 일에 새로운 할 일 더해주기
  // this.setState({ todoData: [...todoData, newTodo], value: "" });
  setTodoData((prev) => [...prev, newTodo])
  setValue("");
  }

  const AllClear = useCallback((id) => {
    setTodoData([]);
  }, []);


  
    return(
      <div className="flex items-center justify-center w-screen h-screen bg-blue-50">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <div className="float-left justify-between mb-3">
            <h1>할 일 목록</h1>
          </div>
          <div><button className="px-4 py-2 bg-gray-200 rounded float-right" onClick={AllClear}>모두 지우기</button></div>

          <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}/>
          <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />

          
          
        </div>
      </div>
    )
  
}
//클래스에서 Component를 사용할 수 있게 extends해줌.
/*Component 클래서 안에서 render 메소드 사용 가능, 
그 안에서 UI 작성*/
//cf. 함수형 컴포넌트 사용시 render()가 필요하지 않음