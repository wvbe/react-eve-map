import React, { useEffect, useState } from 'react';
import {
	TextGeometry,
	FontLoader
} from 'three';

import * as materials from '../materials';

export default function Text({
	position,
	rotation = [0, 0, 0],
	onClick,
	material = materials.wireframe,
	font = '/fonts/helvetiker_regular.typeface.json',
	text,
	size = 3,
	height = 0.2,
	curveSegments = 6,
	...textGeometryProps
}) {
	const [textGeometry, setTextGeometry] = useState(null);

	useEffect(() => new FontLoader().load(font, (fontInstance) => {
		setTextGeometry(new TextGeometry(text, {
			font: fontInstance,
			size,
			height,
			curveSegments,
			...textGeometryProps
		}));
	}), [font, text]);

	return textGeometry ?
		<mesh position={position} rotation={rotation} material={ material } geometry={textGeometry} onClick={onClick} /> :
		null;
}
