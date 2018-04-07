const common = (guessWord, pickWord) => {
    let result = 0;
    const wordMap = {};
    guessWord = guessWord.toUpperCase();
    for(let letter of pickWord){
        if(!wordMap[letter]){
            wordMap[letter] = 0;
        }
        wordMap[letter] += 1;
    }
    for(let letter of guessWord){
        if(wordMap[letter]){
            result++;
            wordMap[letter]--;
            if(wordMap[letter] === 0){
                delete wordMap[letter];
            }
        }
    }
    return result;
}

const correct = (guessWord, pickWord) =>{
    guessWord = guessWord.toUpperCase();
    for(let i = 0; i < 5; i++){
        if(guessWord.charAt(i) !== pickWord.charAt(i)){
            return false;
        }
     }
    return true;
}

module.exports = {
    common,
    correct,
  };