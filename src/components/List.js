import { data } from 'autoprefixer';
import React, {useState} from 'react';

const List = React.memo(({
 id, title, completed, todoData, setTodoData, provided, snapshot, 
}) => {
  const [edited, setEdited] = useState(false);
  
  const onClickEdit = () => {
    setEdited(true);
  };

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map(data => {
      if(data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };

  const Modifier = (data) => {
      let editedData = todoData.map((prev) => ({...prev, data: data.id === id ? data.title : data}))
      setTodoData(editedData);
      setEdited(false);
    }
    

  const handleClick = (id) => {
    let newTodoData = todoData.filter(data => data.id !== id)
    setTodoData(newTodoData);
  };

  return (
    <div key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
                className={`${snapshot.isDragging ? "bg-gray-400": "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>
                  <div className="items-center">
                    <input type="checkbox" defaultChecked={false} onChange={() => handleCompleteChange(id)} />{" "}
                    <span className={completed ? "line-through" : undefined}>{title}</span>
                  </div>
                  <div className="items-center">
                    !todoData.checked ? (
                      edited ? (
                        <button className="float-right" onClick={Modifier}>수정</button>
                      ) : (
                        <button className="float-right" onClick={onClickEdit}>수정</button>
                      ) 
                    ) : null
                  
                    <button className="px-4 py-2 float-right" onClick={() => handleClick(id)}>x</button>
                  </div>
                
              </div>
  );
  });

  export default List
