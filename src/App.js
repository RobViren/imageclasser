import React, { Component } from 'react';
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

  sendData = (payload) => {
  	fetch('https://imageclasser.appspot.com/api/v1/image', {
  		method: 'PUT',
  		headers: {
  			'Content-Type': 'application/json'
  		},
  		body: JSON.stringify(payload)
  	}).then(res => {
      res.text().then(res => {
        console.log(payload, res)
      })
    })
  }

  handleClick = (e) => {
    //Append on used numbers
    let arr = this.state.numbersUsed
    arr.push(this.state.currentNumber)

    //Find new random number
    let unique = false
    let number = 0
    for(let i = 0; i < 100; i++){
      number = this.getRandomInt(this.state.minNumber, this.state.maxNumber)
      unique = true
      arr.map((obj,i) => {
        if(number === obj)
          unique = false
      })
      if(unique === true){
        break
      }
    }

    this.setState({
      numbersUsed: arr,
      currentNumber: number
    })

    //Do API things here
    let rect = ReactDOM.findDOMNode(this.refs['image']).getBoundingClientRect()
    let name = 'image_' + this.state.currentNumber + '.png'
    let payload = {
      name: name,
      data: {
        x: e.clientX - Math.floor(rect.left),
        y: e.clientY - Math.floor(rect.top)
      }
    }
    this.sendData(payload)
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
          <h2>Click Where You Think The Camera Should Center</h2>
        </div>
        <img ref="image" alt="me" src={'./images/image_' + this.state.currentNumber + '.png'} onClick={(e) => this.handleClick(e)} />
      </div>
    );
  }
}

export default App;
