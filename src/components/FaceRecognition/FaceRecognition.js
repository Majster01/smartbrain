import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ box, imageUrl }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt4 br2' >
				<img id='inputImage'className='shadow-5' alt='' width='500px' height='auto' src={ imageUrl } />
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;