import React from 'react';
import { PerspectiveCamera, Vector3 } from 'three';
import { useThree } from 'react-three-fiber';

export default function Spotlights ({
	radius = 100,
	lights = 12,
	y=20,
	intensity = 0.6,
	angle = 45,
	penumbra = 50
}) {
	return Array.from(new Array(lights))
		.map((_, i) => i/lights * 2 * Math.PI)
		.map((rad, i) => {
			const color = 'rgb(' + [
				Math.abs(Math.floor(150 * Math.sin(rad * (i/lights) * 2 * Math.PI + 1/3 * Math.PI))),
				Math.abs(Math.floor(150 * Math.sin(rad * (i/lights) * 2 * Math.PI + 2/3 * Math.PI))),
				Math.abs(Math.floor(150 * Math.sin(rad * (i/lights) * 2 * Math.PI + 3/3 * Math.PI)))
			].join(', ') + ')';

			return <spotLight
				key={ i }
				angle={ (angle/360) * (Math.PI * 2) }
				color={ color }
				intensity={ intensity }
				penumbra={ penumbra }
				castShadow={ true }
				rotation={[-Math.PI*0.5, 0, 0]}
				position={[
					radius * Math.sin(rad),
					y,
					radius * Math.cos(rad)
				]}
			/>;
		});
}
