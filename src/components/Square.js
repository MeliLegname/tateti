import React from "react";

class Square extends React.Component {
  render() {
    let i = this.props.squareNumber[0];
    let j = this.props.squareNumber[1];
    let background = "url(" + this.props.fillings[this.props.square_state] + ")";
    let squareStyle = {
      backgroundImage: background,
      backgroundSize: "70%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };

    return (
      <div
        className="Square"
        onClick={() => {
          this.props.handleButtonChange(i, j);
        }}
        style={squareStyle}
        draggable
        onDragStart={e => this.onDragStart(e, i, j)}
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => this.onDrop(e, i, j)}
      />
    );
  }

  onDragStart(ev, start_i, start_j) {
    ev.dataTransfer.setData("start_i", start_i);
    ev.dataTransfer.setData("start_j", start_j);
  }

  onDragOver(ev) {
    ev.preventDefault();
  }

  onDrop(ev, end_i, end_j) {
    let start_i = ev.dataTransfer.getData("start_i");
    let start_j = ev.dataTransfer.getData("start_j");
    this.props.handleDrag(start_i, start_j, end_i, end_j);
  }
}

export default Square;
