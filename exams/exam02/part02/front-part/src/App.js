import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Controller from './components/Controller';
import Content from './components/Content';
import Hint from './components/Hint';

import { selectWord, newGuess, judgeGuess, deleteData } from './server';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      status: "Start", // "start", "process", "new game"
      AlfredHistory: [],    // guessWord, count, round;
      BarbaraHistory: [],
      AlfredTargetWord: "",
      BarbaraTargetWord: "",
      round: 1,
      AlfredId: -1,
      BarbaraId: -1,
      alfred:"http://localhost:8080",
      barbara: "http://localhost:8888",
      winner: "",
    };
    this.clickFunc = this.clickFunc.bind(this);
  };

  clickFunc = async function(){
    if(this.state.status === "Start"){
      //console.log("a????b",this.state.alfred,this.state.barbara);
      // select guess word for opponent
      //event.target.disabled = true;
      const Bdata = await selectWord(this.state.alfred+"/game");
      this.setState({
          BarbaraId: Bdata.id,
          BarbaraTargetWord: Bdata.secret,
          status: "processing",
      });
      const Adata = await selectWord(this.state.barbara+"/game")
      this.setState({
        AlfredId: Adata.id,
        AlfredTargetWord: Adata.secret,
      });
    //  console.log(this.state.AlfredTargetWord,"    ",this.state.BarbaraTargetWord);
      while( this.state.status !== "New Game"){
       // console.log("current status -> ", this.state.status);
        let AlfredGuess = await  newGuess(this.state.alfred + "/game/" + this.state.AlfredId + "/guessed",
               this.state.round === 1 ? undefined : this.state.AlfredHistory[this.state.round - 2].count);
      //  console.log("Alfred new guess  ->  ", AlfredGuess);
        let AlfredCheck = await judgeGuess(this.state.barbara + "/game/" + this.state.AlfredId + "/guess/" + AlfredGuess.guess);
     //   console.log("Alfred guess check -> ", AlfredCheck);
        this.setState({
          AlfredHistory:[...this.state.AlfredHistory,{
                          word: AlfredGuess.guess,
                          count: AlfredCheck.matched,
                          round: this.state.round,
                      }],
          status: AlfredCheck.hasWon ? "New Game" : this.state.status,
          winner: AlfredCheck.hasWon ? "Alfred" : this.state.winner,
        });
        if(this.state.status === "New Game") break;

        await sleep(500);

        let BarbaraGuess = await  newGuess(this.state.barbara + "/game/" + this.state.BarbaraId + "/guessed",
        this.state.round === 1 ? undefined : this.state.BarbaraHistory[this.state.round - 2].count);
      //  console.log("Barbara new guess  ->  ", BarbaraGuess);
        let BarbaraCheck = await judgeGuess(this.state.alfred + "/game/" + this.state.BarbaraId+ "/guess/" + BarbaraGuess.guess);
        this.setState({
          BarbaraHistory:[...this.state.BarbaraHistory,{
                          word: BarbaraGuess.guess,
                          count: BarbaraCheck.matched,
                          round: this.state.round,
                      }],
          status: BarbaraCheck.hasWon ? "New Game" : this.state.status,
          winner: BarbaraCheck.hasWon ? "Barbara" : this.state.winner,
          round: this.state.round + 1,
        });
        await sleep(500);
      }
    }
    else if(this.state.status === "New Game"){  // "end"
      await deleteData(this.state.alfred + "/game/" + this.state.AlfredId);
      await deleteData(this.state.alfred + "/game/" + this.state.BarbaradId);
      await deleteData(this.state.barbara + "/game/" + this.state.AlfredId);
      await deleteData(this.state.barbara + "/game/" + this.state.BarbaraId);
      this.setState({
        status: "Start", 
        AlfredHistory: [],    // guessWord, count, round;
        BarbaraHistory: [],
        AlfredTargetWord: "",
        BarbaraTargetWord: "",
        round: 1,
        AlfredId: -1,
        BarbaraId: -1,
        alfred:"http://localhost:8080",
        barbara: "http://localhost:8888",
        winner: "",
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Controller 
          clickFunc = {this.clickFunc}
          status = {this.state.status}
        />
        <Content 
          Alfred = {this.state.AlfredHistory}
          Barbara = {this.state.BarbaraHistory}
          AlfredTargetWord = {this.state.AlfredTargetWord}
          BarbaraTargetWord = {this.state.BarbaraTargetWord}
        />
        <Hint 
          status = {this.state.status}
          winner = {this.state.winner}
        />
      </div>
    );
  }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
  



export default App;
