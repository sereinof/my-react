import React from './react'
//import ReactDOM from 'react-dom/client';
import ReactDOM from './react-dom';
import App from './App'
import './index.css'
let element1 = <h1 className='title'style={{color:'red'}}>hello</h1>;
debugger;
let element2 = React.createElement('h1',{style:{color:'red'}},'自定义的元素');
element2.$$typeof = element1.$$typeof
ReactDOM.createRoot(document.getElementById('root')).render(
element2
)
