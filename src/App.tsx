import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import { fetchPosts } from './action/posts';

type Props = {
  value: any;
  onIncrement: () => void;
  onDecrement: () => void
}

interface Post {
    userId:number,
    id:number,
    title:string;
}

function App({ value, onIncrement, onDecrement }: Props) {
  const dispatch = useDispatch()
  const counter = useSelector((state:RootState) => state.counter)
  const todos:string[] = useSelector((state:RootState) =>state.todos)
  const posts: any = useSelector((state:RootState) => state.posts)
  const [todoValue, setTodoValue] = useState("")

  console.log(posts)
  // 비
  useEffect(() => {
    // disptach의 인자로는 액션객체여야 하는데 함수네?
    dispatch(fetchPosts())
  }, [dispatch])





  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value)
  }
  const addTodo = (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    dispatch({type:"ADD_TODO", text:todoValue})
    setTodoValue("")
  }
  return (
    <>
      <p>
        Clicked: {counter} times
        {''}
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </p>

      <ul>
        {
          todos.map((todo,index) => <li key={index}>{todo}</li>)
        }
      </ul>


      <form onSubmit={addTodo}>
        <input type="text" value={todoValue} onChange={handleChange}/>
        <input type="submit"/>
      </form>
      <ul>
        {
          posts.map((post:any,index:any) => 
            <li key={index}>{post.title}</li>
        )
        }
      </ul>
    </>

  );

}
export default App;
