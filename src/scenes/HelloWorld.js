import React from 'react';
import OrbitControls from 'three-orbitcontrols';
import {
	PerspectiveCamera,
	Vector3,
	Color,
	SphereBufferGeometry,
	PlaneGeometry,
	MeshPhongMaterial
} from 'three';
import {
	Canvas,
	useRender,
	useThree
} from 'react-three-fiber';

import * as materials from '../materials';
import Spotlights from '../compositions/Spotlights';

function Orbs () {
	const {
		canvas,
		camera,
		scene
	} = useThree();

	scene.background = new Color(0xf0f0f0);
	var controls = new OrbitControls(camera, canvas);
	controls.damping = 0.2;

	return null;
}

export default function App ({ }) {
	const camera = new PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		1,
		1000);
	camera.position.set(0, 150, 100);
	camera.lookAt(new Vector3(0, 0, 0));

	return <Canvas camera={ camera }>
		<Orbs />
		{/* <axesHelper args={[50]} /> */}
		{/* <gridHelper args={[100, 100, 0x999999, 0xcccccc]} /> */}
		<ambientLight color={ 0xffffff } intensity={ 0.5 } />
		<Spotlights radius={60} lights={3} y={40} />

		<mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow={true} material={materials.whiteMaterial}>
			<planeGeometry attach="geometry" args={[100, 100]} />
		</mesh>
		<mesh material={ materials.whiteMaterial } castShadow={ true } position={[0,10,0]}>
			<dodecahedronGeometry attach="geometry" args={[10]} />
		</mesh>

		<mesh material={ materials.demoMaterial } position={[20, 20, 20]} castShadow={ true }>
			<sphereBufferGeometry attach="geometry" args={[10, 32, 32]} />
		</mesh>

		<group position={[-20, 0, 20]} rotation={[Math.PI/9, Math.PI/7, Math.PI/3]}>
			<mesh material={ materials.redMaterial } position={[0, 0, 0]} castShadow={ true }>
				<boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
			</mesh>
			<mesh material={ materials.redMaterial } position={[0, 0, -20]} castShadow={ true }>
				<boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
			</mesh>
			<mesh material={ materials.redMaterial } position={[0, 0, -40]} castShadow={ true }>
				<boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
			</mesh>
			<mesh material={ materials.redMaterial } position={[0, 0, -60]} castShadow={ true }>
				<boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
			</mesh>
			<mesh material={ materials.redMaterial } position={[0, 0, -80]} castShadow={ true }>
				<boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
			</mesh>

		</group>
	</Canvas>;
}
