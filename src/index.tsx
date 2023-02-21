import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import counter from './reducers';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 로깅 미들웨어 생성
// 리덕스를 사용할 때 로그가 찍히게 된다.
const loggerMiddleware = (store:any) => (next:any) => (action:any) => {
  console.log("store", store)
  console.log("action", action)
  next(action)
}
// 미들웨어 등록
const middleWare = applyMiddleware(thunk, loggerMiddleware)
// 미들웨어 등록하기
const store = createStore(rootReducer, middleWare)

const render = () => root.render(
  <Provider store={store}>
    <App
          value={store.getState()}
         onIncrement={(() => store.dispatch({type:'INCREMENT'}))}
         onDecrement={(() => store.dispatch({type:'DECREMENT'}))}/>
  </Provider>
);

render();
store.subscribe(render)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
