import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './brain.png';
//import chip from './chip.png';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
				<div className="Tilt-inner pa5">
					<img alt='logo' style={{ paddingTop: '0px' }} src={brain} />
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;