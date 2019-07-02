import React, { useMemo } from 'react';
import * as THREE from 'three';

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
		event.stopPropagation();
		onClick(solarSystem);
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