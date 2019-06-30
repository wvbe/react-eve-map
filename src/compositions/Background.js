import { useEffect } from 'react';
import {
	Color
} from 'three';
import {
	useThree,
	useRender
} from 'react-three-fiber';


export default function OrbitControlsComponent ({
	color = 0x000000
}) {
	const {
		scene,
		gl
	} = useThree();

	useEffect(() => {
		gl.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
		scene.background = new Color(color);
	}, [color]);

	return null;
}
