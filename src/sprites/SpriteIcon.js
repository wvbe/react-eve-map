import React, { useMemo, useRef, useEffect } from 'react';
import { getCanvas } from '../sprites';


export default function SpriteIcon ({ name, color, width = 8, height = 8 }) {
	const canvasRef = useRef(null);
	useEffect(() => {
		const canvasIcon = getCanvas(name, width, height, color);
		const context = canvasRef.current.getContext('2d');
		context.clearRect(0,0, width, height);
		context.drawImage(canvasIcon, 0, 0);
	}, [canvasRef.current, name, color, width, height]);

	return <canvas
		ref={canvasRef}
		width={width}
		height={height}
  	/>;
}