import React, { useMemo } from 'react';
import * as THREE from 'three';
import { TetrahedronGeometry, Vector3 } from 'three';

function getColorForSecurityStatus(security) {
}

const jumpMaterial = new THREE.LineBasicMaterial({
	wireframe: true,
	color: 'black',
	opacity: 0.1
});
function Height ({ position }) {
	const geometry = new THREE.Geometry();
	geometry.vertices.push(new Vector3(0, 0, 0));
	geometry.vertices.push(new Vector3(0, -position.y, 0));

	return <group><line geometry={geometry} material={ jumpMaterial } /></group>;
}
export default function Star ({
	// Required
	solarSystem,

	// Not required
	onClick
}) {
	const securityColor = solarSystem.getColor();
	const material = useMemo(() => new THREE.MeshBasicMaterial({
		wireframe: false,
		color: securityColor,
		opacity: 1
	}), [securityColor]);

	const onMeshClick = onClick ? (event) => {
		onClick(event, solarSystem);
		event.stopPropagation();
	 } : null

	const boxSize = 0.3 * solarSystem.RADIUS/1e12 + (solarSystem.hasIncursion ? 3 : 0);

	if(solarSystem.SOLARSYSTEMNAME === 'Onuse')
		console.log('Star', solarSystem, solarSystem.hasIncursion);

	return <group
		position={solarSystem.position}>
		<mesh
			onClick={onMeshClick}
			material={material}
		>
			{
				solarSystem.hasIncursion ?
					<tetrahedronBufferGeometry attach="geometry" args={[boxSize]} /> :
					<boxBufferGeometry attach="geometry" args={[boxSize, boxSize, boxSize]} />
			}
			{/* <Height position={solarSystem.position} /> */}
		</mesh>
	</group>
}