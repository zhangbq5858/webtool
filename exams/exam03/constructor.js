function Constructor(word){
    this.word = word;
}

Constructor.prototype ={ 
    getWord : function(){
        return this.word;
    }
}

module.exports = Constructor;