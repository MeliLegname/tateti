import React from "react";
import Row from "./Row.js";

import PropTypes from "prop-types";

class Board extends React.Component {
  render() {
    var i = 0;
    return (
      <div className="Board">
        {this.props.data.map(row => {
          i += 1;
          return (
            <Row
              squares={row}
              rowNumber={i - 1}
              handleButtonChange={this.props.handleButtonChange}
              fillings={this.props.fillings}
              handleDrag={this.props.handleDrag}
            />
          );
        })}
      </div>
    );
  }
}

Board.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  handleButtonChange: PropTypes.func.isRequired,
  fillings: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Board;
