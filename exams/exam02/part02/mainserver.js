const mainserver = (port) => {

    const express = require('express');
    const path = require('path');
    const bodyParser = require('body-parser');
    const app = express();
    const PORT = port;
    
    const select = require('./selectword');
    const wordlist = require('./wordlist');
    const compare = require('./compare');
    
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
      });
    app.use( express.static('/public') ); // serve any assets by their path under '/' directory (same dir as server.js)
    app.use( bodyParser.json({ extended: true, type: '*/*' }) );
    
    let opponentId = port === 8080 ? 0 : 1; // 8080 opponentId always even
    let targetWords = {};
    let messages = {};
    let timeStampInMs = null;
    
    app.post('/game',(req,resp) => {
        opponentId += 2; //the opponent id
        const targetWord = select.selectWord();
        targetWords[opponentId] = targetWord;

        timeStampInMs =  new Date().getTime();
        console.log(opponentId, " game begin time is -> ", timeStampInMs);

        resp.send(JSON.stringify({
            id : opponentId,
            secret : targetWord,
        }));
    });
    
    app.delete('/game/:id', (req,resp) => {
        const id = req.params.id;
        timeStampInMs =  new Date().getTime();        
        if(port === 8080){
            if(id % 2 === 0){ // opponentId
                delete targetWords[id];
            }else{// own message
                delete messages[id];
                console.log(id, " game end time is -> ", timeStampInMs);
            }
        }else{
            if(id % 2 === 1){ // opponentId
                delete targetWords[id];
            }else{// own message
                delete messages[id];
                console.log(id, " game end time is -> ", timeStampInMs);
            }
        }  
        resp.send("ok");
      
    });
    
    app.get('/game/:id/guess/:guess', (req,resp) => {
        const opponentId = req.params.id;
        const guessWord = req.params.guess;
        const targetWord = targetWords[opponentId];
        //console.log(guessWord,targetWord);
        const common = compare.common(guessWord.toUpperCase(), targetWord);
        const correct = compare.correct(guessWord.toUpperCase(), targetWord);

        timeStampInMs =  new Date().getTime();
       // console.log("guess check time is -> ", timeStampInMs);
        
        resp.send(JSON.stringify({
            matched: common,
            hasWon: correct,
        }));
    });
    
    app.put('/game/:id/guessed',(req, resp) => {
        const ownId = req.params.id;
        if(req.body.matched === undefined){
            let message = {};
            message.guessPool = wordlist;
            messages[ownId] = message;
        }else{
            let message = messages[ownId];
            let tmpPool = [];
            let common = req.body.matched;
            for(let word of message.guessPool){
                if(compare.common(word, message.guessWord) === common){
                    tmpPool.push(word);
                }
            }

            message.guessPool = tmpPool;
        }
        const newGuessWord = select.selectWordFromGuessPool(messages[ownId].guessPool);
        const index = messages[ownId].guessPool.indexOf(newGuessWord);
        messages[ownId].guessPool.splice(index,1);
        messages[ownId].guessWord = newGuessWord;

        timeStampInMs =  new Date().getTime();
        //console.log("gain new guess time is -> ", timeStampInMs);


       //console.log("new guesses -> ", newGuessWord);
        resp.send(JSON.stringify({
            guess : newGuessWord,
        }));
    });
    
    
    
    app.listen(PORT, () => {  // this will start the server waiting for incoming requests
        console.log(`Server listening at http://localhost:${PORT}`);
        console.log('use Ctrl-C to stop this server');
      });
}

module.exports = mainserver;