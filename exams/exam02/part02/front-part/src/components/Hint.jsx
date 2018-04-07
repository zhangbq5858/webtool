import React from 'react';

const Hint = ({status, winner}) => {
    const generateMessage = () => { // "start", "Alfred", "Barbara", "reset"
        let result = "Hint Message: ";

        let message = "";
        if(status === "Start"){
            message = "Click 'Start' to start the competition " ;
        }else{
            message = "Pressing 'New Game' will clear the data from the first game and start over as when Start was initially pressed ";
        }
        return result + message;
    }

    const hasWinner = () => {
        if(winner === "") return;
        else{
          //  console.log("winner????",winner);
            return "The winner is " + winner + "!";
        }
    }

    return (
		<div className="Hint">
            <p className="Winner">{hasWinner()}</p>
            <p>{generateMessage()}</p>
		</div>
	);
}

export default Hint;