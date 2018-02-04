const guesses = ['TREES','TEASE','START','STRAP','LEVEL','PARTS']
const word = 'PARTS'

function common(word,guess){
    let count = 0;
    const wordLetter = {};
    for(let firstLetter of word){
        if(!wordLetter[firstLetter]){
            wordLetter[firstLetter] = 0;
        }
        wordLetter[firstLetter]+=1;
    }
    for(let secondLetter of guess){
        if(wordLetter[secondLetter]){
            count++;
            wordLetter[secondLetter]--;
            if(wordLetter[secondLetter]===0){
                delete wordLetter[secondLetter];
            }
        }
    }
    return count;
}

function correct(word,guess){
    let count = 0;
    for(let i=0;i<word.length;i++){
        if(i>=guess.length){
            break;
        }
        if(word.charAt(i)===guess.charAt(i)){
            count++;
        }
    }
    return count;
}

for(let i=0;i<guesses.length;i++){
    console.log("%s %s %d %d",word,guesses[i],correct(word,guesses[i]),common(word,guesses[i]))
}