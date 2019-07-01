import { useEffect } from 'react';

import { useThree } from 'react-three-fiber';
import {
	GridHelper
} from 'three';
export default function GridHelperComponent ({
	size = 100,
	divisions = 100,
	opacity = 0.25,
	transparent = true
}) {
	const { scene } = useThree();
	useEffect(() => {
		var helper = new GridHelper(size, divisions, 0x999999);
		// helper.position.y = - 199;
		// helper.position.z = - 699;
		helper.material.opacity = opacity;
		helper.material.transparent = transparent;

		scene.add(helper);

		return () => scene.remove(helper);
	})
	return null;
}