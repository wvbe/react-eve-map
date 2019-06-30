import React, { useMemo } from 'react';
import * as THREE from 'three';

import Star from './Star';
import Jump from './Jump';
import { Canvas } from 'react-three-fiber';

import OrbitControls from './compositions/OrbitControls';
import Background from './compositions/Background';

const DEFAULT_CAMERA_FOCUS = new THREE.Vector3(0, 0, 0);
export default function Tree({ selectedSolarSystem, solarSystems, infestedSolarSystems, onSolarSystemClick, jumps }) {
	console.log('Render StarMap');
	const solarSystemsById = useMemo(
		() => {
			console.time('solarSystemsById');
			const ret = solarSystems.reduce((byId, con) => {
				byId[con.SOLARSYSTEMID] = con;
				return byId;
			}, {});
			console.timeEnd('solarSystemsById');
			return ret;
		},
		[ solarSystems ]
	);

	const camera = useMemo(() => {
		console.log('useMemo camera');
		const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
		camera.position.set(0, 750, 0);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		return camera;
	}, []);

	const solarSystemComponents = useMemo(
		() => {
			console.log('useMemo solarSystemComponents');
			return solarSystems.map((solarSystem, index) => (
				<Star key={index} solarSystem={solarSystem} onClick={onSolarSystemClick} />
			));
		},
		[]
	);
	const jumpComponents = useMemo(
		() => {
			console.log('useMemo jumpComponents');
			return jumps.map((jump, index) => (
				<Jump start={solarSystemsById[jump[0]]} end={solarSystemsById[jump[1]]} key={index} />
			));
		},
		[]
	);

	const orbitControlsComponent = <OrbitControls
		target={selectedSolarSystem ? selectedSolarSystem.position : DEFAULT_CAMERA_FOCUS}
		enablePan={true}
		enableRotate={true}
		enableZoom={true}
		autoRotateSpeed={0}
	/>

	return (
		<Canvas camera={camera}>
			{ orbitControlsComponent }
			<Background color={0xfcfcfc} />
			{solarSystemComponents}
			{jumpComponents}
		</Canvas>
	);
}
