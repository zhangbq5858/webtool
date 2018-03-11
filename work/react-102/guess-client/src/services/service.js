export const generateTargetWord = () => {
    return fetch('/generate')
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('get-fail in generate') );
  };
  
  export const askForResult = (userId, guessWord) => {
    return fetch('/guess', {
      method: 'POST',
      body: JSON.stringify( { userId: userId, guessWord: guessWord } )
    })
    .then( response => response.ok ? response.json() : Promise.reject(response.statusText) )
    .catch(  error  => Promise.reject(error))
  };

  export const askForWordPool = () => {
    return fetch('/wordPool')
    .then( response => response.ok ? response.json() : Promise.reject(response.statusText ))
    .catch(  error  => Promise.reject(error))
  };

  export const resetGame = ( userId ) => {
    return fetch('/reset', {
      method: 'POST',
      body: JSON.stringify( { userId: userId} )
    })
    .then( response => response.ok ? response.text() : Promise.reject(response.statusText ))
    .catch(  error  => Promise.reject(error))
  };