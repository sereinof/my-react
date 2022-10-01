import React from './react'
//import ReactDOM from 'react-dom/client';
import ReactDOM from './react-dom';
import App from './App'
import './index.css'
function MyComponent(props){
  return <h1>{props.messager}</h1>
}

let element1 = <MyComponent messager='你好'style={{color:'red'}}></MyComponent>;
debugger
let element2 = React.createElement('h1',{style:{color:'red'}},'自定义的元素');
element2.$$typeof = element1.$$typeof
ReactDOM.createRoot(document.getElementById('root')).render(
element1
)
