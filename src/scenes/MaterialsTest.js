import React, { useEffect } from 'react';
import OrbitControls from 'three-orbitcontrols';
import {
	PerspectiveCamera,
	Vector3,
	Color
} from 'three';
import {
	Canvas,
	useThree
} from 'react-three-fiber';

import * as materials from '../materials';


function Orbs () {
	const {
		canvas,
		camera,
		scene
	} = useThree();

	useEffect(() => {
		console.log('-- new OrbitControls');
		var controls = new OrbitControls(camera, canvas);
		controls.damping = 0.2;

		scene.background = new Color(0);
	}, [camera, canvas]);

	return null;
}

export default function Tree () {
	const camera = new PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		1,
		1000);
	camera.position.set(95, 150, 0);
	camera.lookAt(new Vector3(0, 0, 0));
	console.log('-- RENDER');
	return <Canvas camera={ camera }>
		<Orbs />
		{/* <axesHelper args={[50]} /> */}

		{/* <gridHelper args={[100, 100, 0x222222, 0x111111]} /> */}

		<ambientLight color={ 0xffffff } intensity={ 0.5 } />

		<directionalLight color={ 0xaaaaaa } />

		{ Object.keys(materials).map((name, i, names) => ({
				name,
				material: materials[name],
				x: (i + 0.5 - names.length/2) * 20
			})).map(example => <group key={example.name}>
				<mesh material={ example.material } position={[example.x, 0, 40]}>
					<tetrahedronBufferGeometry attach="geometry" args={[8]} />
				</mesh>
				<mesh material={ example.material } position={[example.x, 0, 20]}>
					<boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
				</mesh>
				<mesh material={ example.material } position={[example.x, 0, 0]}>
					<dodecahedronBufferGeometry attach="geometry" args={[7]} />
				</mesh>
				<mesh material={ example.material } position={[example.x, 0, -20]}>
					<icosahedronBufferGeometry attach="geometry" args={[7]} />
				</mesh>
				<mesh material={ example.material } position={[example.x, 0, -40]} rotation={[0, -0.5 * Math.PI, 0]}>
					<torusKnotBufferGeometry attach="geometry" args={[4, 2]} />
				</mesh>
			</group>)
		}


	</Canvas>;
}
