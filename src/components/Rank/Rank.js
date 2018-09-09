import React from 'react';
import Tilt from 'react-tilt';
//import chip from './chip.png';

const Rank = ({ name, entries }) => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
				<div className="Tilt-inner pa4">
					<p className='f4'>{`${name} , your current rank is: `}</p>
					<h1 className='f2'>{ entries }</h1>
				</div>
			</Tilt>
		</div>
	);
}

export default Rank;