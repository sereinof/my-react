import React from './react'
//import ReactDOM from 'react-dom/client';
import ReactDOM from './react-dom';
import App from './App'
import './index.css'
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return <h1>54突然{this.props.messager}</h1>
  }
}

let element1 = <MyComponent messager='下午好、周羽庆' style={{ color: 'red' }}></MyComponent>;
debugger
let element2 = React.createElement('h1', { style: { color: 'red' } }, '自定义的元素');
element2.$$typeof = element1.$$typeof
ReactDOM.createRoot(document.getElementById('root')).render(
  element1
)
