import React from "react";
import "./style/App.css";
import Board from "./components/Board.js";
import x from "../src/x.png";
import o from "../src/o.png";
// import React, { Component } from "react";
// import SweetAlert from "sweetalert2-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],

      fillings: ["", x, o],

      contX: 0,

      contO: 0,

      playerX: true,

      alguienGano: false,

      ganador: "",
    };
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  render() {
    return (
      <div id="main">
        <Board
          data={this.state.data}
          fillings={this.state.fillings}
          handleButtonChange={this.handleButtonChange}
          handleDrag={this.handleDrag}
          isPlaying={this.isPlaying}
        />
        <br />
        {this.mostrarJugador()}
        {this.mostrarGanador()}

        {/* <input type="button" onClick={this.addColumn} value="Add Column" />
        <input type="button" onClick={this.addRow} value="Add Row" /> */}
      </div>
    );
  }

  handleButtonChange(i, j) {
    let new_data = this.state.data.map(row => {
      return [...row];
    });
    // let icons_qty = this.state.fillings.length - 1;
    let button_state = this.state.data[i][j];
    let contX = this.state.contX;
    let contO = this.state.contO;

    //si contx === 3 y contO === 3 NO entra a la función - con el not(!) INVIERTO el resultado de la condición. ENtonces cuando X y 0 son 3 ambos la condición es verdadera y se niega por ende no entra más a la func.

    if (!this.state.alguienGano) {
      if (!(contX === 3 && contO === 3)) {
        if (button_state === 0) {
          if (this.state.playerX && contX < 3) {
            new_data[i][j] = 1;
            contX++;
            // console.log("Player x");
          } else if (!this.state.playerX && contO < 3) {
            new_data[i][j] = 2;
            contO++;
          }
          let nextPlayer = !this.state.playerX;

          this.setState({ data: new_data, playerX: nextPlayer, contO, contX });
        }
      }
      this.winValidation(new_data, new_data[i][j]);
    }
  }

  handleDrag(start_i, start_j, end_i, end_j) {
    let new_data = this.state.data.map(row => {
      return [...row];
    });

    let button_start = this.state.data[start_i][start_j];
    let button_state = this.state.data[end_i][end_j];
    let contX = this.state.contX;
    let contO = this.state.contO;
    let nextPlayer = !this.state.playerX;

    if (!this.state.alguienGano) {
      if (!(button_start === 0)) {
        if (contX === 3 && contO === 3) {
          if (button_state === 0 && this.moveValidation(start_i, start_j, end_i, end_j)) {
            new_data[end_i][end_j] = new_data[start_i][start_j];
            new_data[start_i][start_j] = 0;

            this.setState({ data: new_data, playerX: nextPlayer });
          }
        }
      }
      this.winValidation(new_data, button_start);
    }
  }

  // Y=i fila X=j columna
  moveValidation(start_i, start_j, end_i, end_j) {
    let permitido = false;
    let distanciaI = end_i - start_i;
    let distanciaJ = end_j - start_j;
    let button_start = this.state.data[start_i][start_j];
    // let button_state = this.state.data[end_i][end_j];

    // let nextPlayer = !this.state.playerX;

    // console.log('eje x : ', distanciaJ);
    // console.log('eje y : ', distanciaI);

    if (button_start === 1 && this.state.playerX) {
      permitido = true;
    } else if (button_start === 2 && !this.state.playerX) {
      permitido = true;
    }
    return (
      (Math.abs(distanciaI) === 0 && Math.abs(distanciaJ) === 1 && permitido) ||
      (Math.abs(distanciaI) === 1 && Math.abs(distanciaJ) === 1 && permitido) ||
      (Math.abs(distanciaI) === 1 && Math.abs(distanciaJ) === 0 && permitido)
    );
  }

  winValidation(new_data, button_start) {
    // let button_start = this.state.data[start_i][start_j];
    let data = new_data;

    //chekeo por filas

    if (
      (data[0][0] !== 0 && data[0][0] === data[0][1] && data[0][0] === data[0][2]) ||
      (data[1][0] !== 0 && data[1][0] === data[1][1] && data[1][0] === data[1][2]) ||
      (data[2][0] !== 0 && data[2][0] === data[2][1] && data[2][0] === data[2][2])
    ) {
      console.log("Ganaste Fila", button_start);
      this.setState({ ganador: button_start, alguienGano: true });
    }
    //chekear por columnas
    else if (
      (data[0][0] !== 0 && data[0][0] === data[1][0] && data[0][0] === data[2][0]) ||
      (data[0][1] !== 0 && data[0][1] === data[1][1] && data[0][1] === data[2][1]) ||
      (data[0][2] !== 0 && data[0][2] === data[1][2] && data[0][2] === data[2][2])
    ) {
      console.log("Ganaste Columna", button_start);
      this.setState({ ganador: button_start, alguienGano: true });
    } else if (
      (data[0][0] !== 0 && data[0][0] === data[1][1] && data[0][0] === data[2][2]) ||
      (data[0][2] !== 0 && data[0][2] === data[1][1] && data[0][2] === data[2][0])
    ) {
      console.log("Ganaste Diagonal", button_start);
      this.setState({ ganador: button_start, alguienGano: true });
    }
  }

  mostrarGanador() {
    if (this.state.alguienGano) {
      return <h1> El ganador es el jugador {this.state.ganador}</h1>;
    }
  }

  mostrarJugador() {
    if (this.state.alguienGano === false) {
      if (this.state.playerX === false) {
        return (
          <div>
            <img src={" ' " + this.state.fillings[2] + " ' "} />
            <h2>juega player O</h2>
          </div>
        );
      } else if (this.state.playerX === true) {
        return (
          <div>
            <img src={" ' " + this.state.fillings[1] + " ' "} />
            <h2>juega player x</h2>
          </div>
        );
      }
    } else if (this.state.alguienGano === true) {
    }
  }

  proximaPartida(){
    if (this.state.alguienGano === true){
      return <button onCLick={}>proxima partida</button>
      
    }
  }

  addColumn() {
    let new_data = this.state.data.map(row => {
      return [...row];
    });
    new_data.map(row => {
      row.push(0);
    });
    this.setState({ data: new_data });
  }

  addRow() {
    let new_data = this.state.data.map(row => {
      return [...row];
    });
    let new_row = [];
    new_data[0].map(row => {
      new_row.push(0);
    });
    new_data.push(new_row);
    this.setState({ data: new_data });
  }
}

export default App;
