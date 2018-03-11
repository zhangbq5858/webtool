const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

const wordPool = require('./wordPool');
const compare = require('./compare');

let targetWords = {};
let id = 0;

app.post('/generate',(req, resp) => {
    id++;
    const targetWord = wordPool.selectWord();
    targetWords[id] = targetWord;
    resp.send(JSON.stringify(id));
});


app.post('/guess',(req, resp) => {
    const userId = req.body.id;
    const guessWord = req.body.word;
    const targetWord = targetWords[userid];
    if(typeof(targetWord) === "undefined"){
        resp.status(400).send("No current userId").end();
    }else if(typeof(guessWord) === "undefined" || guessWord.length != targetWord.length){
        resp.status(400).send("Invalid length of guessWord").end();
    }else if(! wordPool.validWord(guessWord.toUpperCase())){
        resp.status(400).send("No such word in wordPool").end();
    }else{
        console.log(guessWord,targetWord);
        const common = compare.common(guessWord.toUpperCase(), targetWord);
        const correct = common === 5 ? compare.correct(guessWord.toUpperCase(), targetWord) : false;
        resp.send(JSON.stringify({
            common: common,
            correct: correct,
        }));
    }
});


app.post('/wordPool',(req, resp) => {
    resp.send(JSON.stringify(wordPool.wordlist));
});


app.listen(PORT, () => {  // this will start the server waiting for incoming requests
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
  });