import React, { useMemo } from 'react';
import * as THREE from 'three';

import StarMapJumps from './starMap/StarMapJumps';
import StarMapStars from './starMap/StarMapStars';
import { Canvas } from 'react-three-fiber';

import OrbitControls from './compositions/OrbitControls';
import Background from './compositions/Background';
import GridHelper from './compositions/GridHelper';

const DEFAULT_CAMERA_FOCUS = new THREE.Vector3(0, 0, 0);

export default function Tree({
	selectedSolarSystem,
	solarSystems,
	solarSystemsById,
	jumps,
	onSolarSystemClick,
	showJumps,
	showSolarSystems
}) {
	const camera = useMemo(() => {
		console.log('useMemo camera');
		const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
		camera.position.set(0, 750, 0);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		return camera;
	}, []);

	return (
		<Canvas camera={camera}>
			<GridHelper size={1000} divisions={50} opacity={0.1} />
			<OrbitControls
				target={selectedSolarSystem ? selectedSolarSystem.position : DEFAULT_CAMERA_FOCUS}
				enablePan={true}
				enableRotate={true}
				enableZoom={true}
				autoRotateSpeed={0}
				zoomSpeed={3}
			/>
			<Background color={0x111111} />
			<StarMapStars
				solarSystems={solarSystems}
				onSolarSystemClick={onSolarSystemClick}
				visible={showSolarSystems}
			/>
			<StarMapJumps solarSystemsById={solarSystemsById} jumps={jumps} visible={showJumps} />
		</Canvas>
	);
}
