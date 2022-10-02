import React from './react'
//import ReactDOM from 'react-dom/client';
import ReactDOM from './react-dom';
import App from './App'
import './index.css'
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(()=>{
      this.setState({
        messager:'早上好，周玉庆'
      })
    },2000)
  }

  render(){
    return <h1>54突然{this.props.messager}</h1>
  }
}

let element1 = <MyComponent messager='下午好、周羽庆' style={{ color: 'red' }}></MyComponent>;
debugger
ReactDOM.createRoot(document.getElementById('root')).render(
  element1
)
