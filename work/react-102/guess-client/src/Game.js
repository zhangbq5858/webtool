import React, { Component } from 'react';
//import './App.css';

// Components
import GGHeader from './GGHeader';
import GGBody from './GGBody';
import GGController from './GGController';
import GGStatus from './GGStatus';

import { askForResult,askForWordPool,generateTargetWord,resetGame } from './services/service';

class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            mode: 'guess', //'guess' or 'reset'
            history: [],
            userId: null, 
            round: 0,
            errorMessage: "Please enter word to guess",
            word:"",
        }
        this.submitWord = this.submitWord.bind(this);
        this.updateWord = this.updateWord.bind(this);
    }

    componentWillMount() {
        this.fetchTargetWord();
    }

    fetchTargetWord(){
        generateTargetWord()
        .then(data => {
            this.setState({
                userId: data.userId,
            });
        })
    }
    
    updateWord(word){
        if(this.state.mode === "reset"){
            return;
        }
        this.setState({
            word,
        })
    }

    submitWord(){
        if(this.state.mode === "guess"){
            askForResult(this.state.userId, this.state.word)
            .then(data => {
                let round = this.state.round + 1;
                this.setState({
                    history:[...this.state.history,{
                        word: this.state.word,
                        count: data.common,
                        round: round 
                    }],
                    round,
                    errorMessage: data.correct ? "You won in round " + round + ", the target word is -> " + this.state.word : "Please enter word to guess",
                    word: "",
                    mode: data.correct ? "reset" : "guess",
                });
            })
            .catch(errorMessage => {
                this.setState({
                    errorMessage,
                });
            })
        }else if(this.state.mode === "reset"){
            resetGame(this.state.userId)
            .then(data => {
                this.setState({
                    mode: "guess",
                    history:[],
                    word: "",
                    round: 0,
                    errorMessage: "Please enter word to guess",
                });
            })
            .catch(errorMessage => {
                this.setState({
                    errorMessage,
                });
            })
        }else{
            return;
        }
    }

    render(){
        return(
            <div className="guess-word">
                <GGHeader title=" Welcome To Guess Word Game" />
                <GGStatus hintMessage={this.state.errorMessage}/>
                <GGController
                    mode = {this.state.mode}
                    word = {this.state.word}
                    submitWord = {this.submitWord}
                    onUpdateWord = {this.updateWord}
                />
                <GGBody history={this.state.history} />
            </div>
        )
    };
}

export default Game;