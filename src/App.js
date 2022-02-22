import React, {Component} from "react";
import "./App.css";
/*리액트 라이브러리에서 React를 가져오고, 
Component라는 클래스도 가져옴*/

export default class App extends Component {

  state = {
    todoData : [],
    value: ""
  }

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer", 
    float: "right",
  }

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    }
  }

  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter(data => data.id !== id)
    this.setState({ todoData: newTodoData });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value})
  }

  handleSubmit = (e) => {
  //form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();
  //새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };
  //원래 있던 할 일에 새로운 할 일 더해주기
  this.setState({ todoData: [...this.state.todoData, newTodo], value: "" });
  }
  
  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map(data => {
      if(data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })

    this.setState({ todoData: newTodoData });
  }
  
  render() {
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          {this.state.todoData.map((data) => (
            <div style={this.getStyle(data.completed)} key={data.id}>
              <input type="checkbox" defaultChecked={false} onChange={() => this.handleCompleteChange(data.id)} />
              {data.title}
              <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
            </div>
          ))}

          <form style={{ display: 'flex'}} onSubmit={this.handleSubmit}>
            <input type="text" name="value" style={{ flex: '10', padding: '5px'}}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: '1'}}
            />
          </form>
          
        </div>
      </div>
    )
  }
}
//클래스에서 Component를 사용할 수 있게 extends해줌.
/*Component 클래서 안에서 render 메소드 사용 가능, 
그 안에서 UI 작성*/
//cf. 함수형 컴포넌트 사용시 render()가 필요하지 않음