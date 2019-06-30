import React from 'react';
import * as THREE from 'three';
import * as materials from '../materials';
import {
	Canvas
} from 'react-three-fiber';

import OrbitControls from '../compositions/OrbitControls';
import Background from '../compositions/Background';

import constellations from '../constellations.json';

function Star ({
	constellation,
	onClick
}) {
	if (!constellation) {
		console.log('Undefined constellation fuck off');
		return null;
	}
	const position = getVector3ForConstellation(constellation);

	return <group>
		<mesh
			onClick={onClick ? (event) => onClick(event, constellation) : null}
			position={position}
			material={materials.wireframe}
		>
			<tetrahedronBufferGeometry attach="geometry" args={[1]} />
		</mesh>
	</group>
}

const cosmicMultiplier = 1e-15;
function getVector3ForConstellation (constellation) {
	return new THREE.Vector3(constellation.X * cosmicMultiplier, constellation.Y * cosmicMultiplier, constellation.Z * cosmicMultiplier)
}

export default function Tree () {
	const camera = new THREE.PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		1,
		1000);
	camera.position.set(100, 300, 0);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	return <Canvas camera={ camera }>
		<OrbitControls
			enablePan={true}
			enableRotate={true}
			enableZoom={true}
			autoRotateSpeed={ 0 }
		/>
		<Background color={0xFCFCFC} />

		{ constellations
			// .slice(0, 1000)
			.map((constellation, index) => <Star
				key={index}
				constellation={constellation}
				onClick={(event, constellation) => {
					console.log('Clicked ' + constellation.SOLARSYSTEMNAME, constellation);

					// Need to get the "controls" const that is currently private to <OrbitControls />
					// controls.target.set(getVector3ForConstellation(constellation))
				}}
			/>)}
	</Canvas>;
}
