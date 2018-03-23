const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

const wordPool = require('./wordPool');
const compare = require('./compare');

app.use( express.static('public') ); // serve any assets by their path under 'public' directory
app.use( bodyParser.json({ extended: true, type: '*/*' }) );

let targetWords = {};
let id = 0;

app.get('/generate',(req, resp) => {
    id++;
    const targetWord = wordPool.selectWord();
    targetWords[id] = targetWord;
    resp.send(JSON.stringify({userId : id}));
});


app.post('/guess',(req, resp) => {
    const userId = req.body.userId;
    const guessWord = req.body.guessWord;
    const targetWord = targetWords[userId];
    if(typeof(targetWord) === "undefined"){
        resp.statusMessage = " Invalid userId ";
        resp.status(400).end();
    }else if(typeof(guessWord) === "undefined" || guessWord.length != targetWord.length){
        resp.statusMessage = " Invalid length of guessWord";
        resp.status(400).end();
    }else if(! wordPool.validWord(guessWord.toUpperCase())){
        resp.statusMessage = " No such word in wordPool";
        resp.status(400).end();
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


app.get('/wordPool',(req, resp) => {
    resp.send(JSON.stringify(wordPool.wordlist));
});

app.post('/reset',(req, resp) => {
    const userId = req.body.userId;
    targetWords[userId] = wordPool.selectWord();
    resp.send("ok");
});


app.listen(PORT, () => {  // this will start the server waiting for incoming requests
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
  });