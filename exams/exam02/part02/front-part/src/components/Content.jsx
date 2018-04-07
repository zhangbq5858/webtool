import React from 'react';


const Content = ({Alfred, Barbara, AlfredTargetWord, BarbaraTargetWord}) => {

    const showHistory = (records) => {   // word, count, round;
        let results = [];
        for(const record of records){
           // console.log("REcord content: -> ", record.word, record.count,record.round);
            let result =  <li className='record' key={record.word}><span className='word'>{record.word}</span> <span className="common-number">{record.count}</span><span className='round'>{record.round}</span></li>;
            results.push(result);
        }
        return results;
    }

    return (
		<div className="Content">
		    <ul className='Alfred-player'>
                <p className="player-name"> Alfred's Target Word is -> {AlfredTargetWord}</p>
                    <ul className='content-title' >
                        <li className='history-title'>History</li>
                        <li className='common-title'>Common</li>
                        <li className='round-title'>Round</li>
                    </ul>
                    <ul className='records'>
                        {showHistory(Alfred)}
                    </ul>
            </ul>
            <ul className='Barbara-player'>
                <p className="player-name" > Barbara's Target Word is -> {BarbaraTargetWord}</p>
                    <p className="target-word" ></p>
                    <ul className='content-title'>
                        <li className='history-title'>History</li>
                        <li className='common-title'>Common</li>
                        <li className='round-title'>Round</li>
                    </ul>
                    <ul className='records'>
                        {showHistory(Barbara)}
                    </ul>
            </ul>
		</div>
	);
}

export default Content;