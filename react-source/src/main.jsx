import React from './react'
//import ReactDOM from 'react-dom/client';
import ReactDOM from './react-dom';
import App from './App'
import './index.css';
class Ref extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClck = (event) => {
    debugger
  }
  render() {
    return <h1 ref={this.a} /* onClick={this.handleClck} */ >54突然{this.state.count}</h1>
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.a = React.createRef();
  }
  handleClck = (event) => {
    debugger

    this.setState({
      count: this.state.count + 1,
    });
  }
  render() {
    return <div onClick={this.handleClck}><Ref ref={this.a} count={1} ></Ref></div>
  }
}

let element1 = <MyComponent count={1} messager='下午好、周羽庆' style={{ color: 'red' }}></MyComponent>;
ReactDOM.createRoot(document.getElementById('root')).render(
  element1
)
