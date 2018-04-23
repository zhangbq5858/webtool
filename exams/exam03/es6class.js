class Es6Class {
    constructor(word) {
        this.word = word;
        this.getWord = function(){
            return this.word;
        }
    }
}

module.exports = Es6Class;