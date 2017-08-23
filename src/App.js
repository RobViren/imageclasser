import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props);
    let min = 0
    let max = 31
    let number = this.getRandomInt(min,max)
    this.state = {
      numbersUsed: [],
      currentNumber: number,
      minNumber: 0,
      maxNumber: 31
    };
  }

  handleClick = (e) => {
    let rect = ReactDOM.findDOMNode(this.refs['image']).getBoundingClientRect()

    //Do API things here
    console.log(e.clientX - Math.floor(rect.left))
    console.log(e.clientY - Math.floor(rect.top))

    //Append on used numbers
    let arr = this.state.numbersUsed
    arr.push(this.state.currentNumber)

    //Find new random number
    for(let i = 0; i < 100; i++){
      let number = this.getRandomInt(this.state.minNumber, this.state.maxNumber)

    }

    this.setState({
      numbersUsed: arr
    })
    console.log(this.state)
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  componentWillMount(){
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <img ref="image" alt="me" src={'./images/image_' + this.state.currentNumber + '.png'} onClick={(e) => this.handleClick(e)} />
      </div>
    );
  }
}

export default App;
