const wordlist = require('./wordlist');

const selectWord = () => {
    return wordlist[ Math.floor( Math.random() * wordlist.length ) ];
};

const selectWordFromGuessPool = (guessPool) => {
    return guessPool[ Math.floor( Math.random() * guessPool.length ) ];
}

module.exports = {
    selectWord,
    selectWordFromGuessPool,
};