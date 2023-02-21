# Redux

# 리덕스란?
자바스크립트 애플리케이션을 위한 상태 관리 라이브러리

### Props vs state
1. props
- properties의 줄임말
- Props는 구성 요소가 서로 통신하는 방법
- props는 상위 구성 요소에서 아래쪽으로 흐른다
- 해당 값을 변경하려면 자식 관점에선 props를 변경할 수 있으며, 부모는 내부 상태를 변경해야 함. -> 부모 컴포넌트의 state를 변경해주어야 함

2. state
- 부모 컴포넌트에서 자식 컴포넌트에서 데이터를 보내는게 아닌 하나의 컴포넌트 안에서 데이터를 전달하려면 state로 해야함
- state는 조작 할 수 있다 -> props는 props자체를 변경할 수 없지만 state는 state 자체를 변경할 수 있다.
- state가 변하면 리렌더링이 된다.


## 그래서 redux가 뭔데?
Flux를 구현해놓은 구현체라고 생각하면 될 것 같다.


1. Redux는 State를 관리하는 것.
- Store라는 저장소에 데이터를 넣어두고, 필요한 곳에서 store의 데이터를 가져다 쓸 수 있다.
- 필요에 따라 컴포넌트에서 그 store의 데이터를 업데이트 할 수도 있다.


### Action? Payload? Store? Reducer? Provider?
1. Action
- Action은 간단한 javascript 객체
- 우리가 수행하는 작업의 유형을 지정하는 type 속성이 있으며 선택적으로 redux 저장소에 일부 데이터를 보내는데 사용되는 payload 속성을 가질 수 도 있음
2. Reducer 
- 애플리케이션 상태의 변경 사항을 결정하고 업데이트된 상태를 반환하는 함수
- 인수로 조치를 취하고 store 내부의 상태를 업데이트 한다.
- Reducer는 순수함수이며, 내부에서 순수함수가 아닌 것들을 사용하면 안된다.

3. Store
- 리듀서와 액션을 하나로 모으는 객체 저장소로, 애플리케이션의 전체 상태 트리를 보유
- 내부 상태를 변경하는 유일한 방법은 해당 상태에 대한 Action을 전달하는 것
- 클래스가 아님. 메소드가 있는 객체일 뿐.

4. Provider
- <Provider> 구성 요소는 Redux store 저장소에 엑세스해야 하는 모든 중첩 구성 요소에서 Redux Store 저장소를 사용할 수 있도록 한다.
- React Redux 앱의 모든 React 구성 요소는 저장소에 연결할 수 있으므로 대부분의 응용 프로그램은 전체 앱의 구성요소 트리가 내부에 있는 최상위 수준에서 <Provider>를 렌더링 한다
- 그 다음 Hooks 및 연결 API는 React의 컨텍스트 메커니즘을 통해 제겅된 저장소 인스턴스에 엑세스할 수 있다.



### useSelector, useDispatch
1. useSelector
- useSelector Hooks를 이용해서 스토어의 값을 가져올 수 있다.



2. useDispatch
- store에 있는 dispatch 함수에 접근하는 hooks

### 미들웨어

1. 미들웨어란?
리덕스에서 dispatch를 하면 action이 리듀서로 전달되고, 리듀서는 새로운 state를 반환<br>
그런데 미들웨어를 사용하면 이 과정 사이에 우리가 하고싶은 작업들을 넣어서 할 수 있다.<br>
만약 counter 앱에 더하기 버튼을 클릭했을때, 바로 1을 더하지 않고 3초를 기다렸다가 +1이 되도록 구현하려면 미들웨어를 사용하지 않고서는 구현할 수 없다.<br>
<!-- -> 리듀서는 순수함수기 때문에 안에서 콜백을 사용하면 안되니까? -->
왜냐면 dispatch가 되자마자 바로 action이 리듀서로 달려가서 새로운 state를 반환해버리기 때문<br>
즉 Redux 미들웨어란, 액션을 dispatch하고 리듀서에 도달하는 순간 사이에 지정된 작업을 실행할 수 있게 해주는 중간자<br>
로깅, 충돌보고, 비동기 API와 통신, 라우팅 등을 위해 redux 미들웨어를 사용한다.

- 로깅 미들웨어 생성하기 -> 리덕스를 이용할 때 나오는 로그를 찍어주는 미들웨어 생성

```typescript

// 로깅 미들웨어 생성
// 리덕스를 사용할 때 로그가 찍히게 된다.

const loggerMiddleware = (store:any) => (next:any) => (action:any) => {
  console.log("store", store)
  console.log("action", action)
  next(action)
}
// 미들웨어 등록
const middleWare = applyMiddleware(loggerMiddleware)
// 스토어 생성할때 미들웨어 등록하기
const store = createStore(rootReducer, middleWare)
```

### Redux Thunk
리덕스를 사용하는 앱에서 비동기 작업을 할 때 많이 사용 하는 방법<br>
thunk란, 일부 지연된 작업을 수행하는 코드 조각을 의미. 지금 일부 논리를 실행하는 대신 나중에 작업을 수행하는데 사용할 수 있는 함수 본문이나 코드를 작성할 수 있다.<br>
비동기 작업을 할땐 주로 서버에 요청을 보내서 데이터를 가져올 때이다

```typescript
useEffect(() => {
    // disptach의 인자로는 액션객체여야 하는데 함수네?
    dispatch(fetchPosts())
  }, [dispatch])


const fetchPosts = () : any => {
  return async function fetchPostThunk(dispatch:any, getState: any) {
    const response =  await axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch({type:"FETCH_POSTS", payload:response.data})
  }
}

// 이렇게만 하면 현재 에러가 난다.
// 원래 action은 객체여야 하는데 현재는 함수를 disptach 하고있어서 나는 에러
// 그래서 함수를 dispatch 할 수 있게 해주는 redux-thunk 미들웨어를 설치


// 미들웨어에 thunk 등록
// thunk를 등록함으로써, 함수를 disptach 할 수 있게 된다.
// redux thunk는 dispatch에 들어온 인자가 액션객체일 경우 리듀서로 보내고
// 액션객체가 아닐경우 dispatch와 getState란 함수로 다시 콜을 한다
const middleWare = applyMiddleware(thunk, loggerMiddleware)

```

결론 -> Redux Thunk를 사용함으로써 액션 생성자가 그저 하나의 액션 객체를 생성할 뿐 아니라 그 내부안에서 여러가지 작업도 할 수 있게 만등러 준다.