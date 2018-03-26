import React from 'react';

import Button from './Button';

const Controller = ({clickFunc, status}) => {

    return (
		<div className="Controller">
			<Button 
                clickFunc={clickFunc}
                status={status}
      />
		</div>
	);
}

export default Controller;