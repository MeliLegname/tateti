import React from 'react';
import Square from './Square.js';

class Row extends React.Component {

  render(){
    let squares = [];
    for (let i = 0; i < this.props.squares.length; i++){
      squares.push( <Square handleButtonChange = {this.props.handleButtonChange} 
                            squareNumber = {[this.props.rowNumber, i]} 
                            square_state = {this.props.squares[i]}
                            fillings = {this.props.fillings}
                            handleDrag = {this.props.handleDrag} /> )
    }
    return (
      <div className="Row">
        {squares}
      </div>
    )
  }
};

export default Row;