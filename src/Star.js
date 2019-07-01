import React, { useMemo } from 'react';
import * as THREE from 'three';
import { TetrahedronGeometry } from 'three';

function getColorForSecurityStatus(security) {
}

export default function Star ({
	// Required
	solarSystem,

	// Not required
	isInvaded,

	// Not required
	onClick
}) {
	const securityColor = solarSystem.getColor();
	const material = useMemo(() => new THREE.MeshBasicMaterial({
		wireframe: true,
		color: solarSystem.hasIncursion ? 'blue' : securityColor,
		opacity: 1
	}), [securityColor]);

	const onMeshClick = onClick ? (event) => {
		onClick(event, solarSystem);
		event.stopPropagation();
	 } : null

	const boxSize = 0.8 * solarSystem.RADIUS/1e12 + (solarSystem.hasIncursion ? 3 : 0);

	if(solarSystem.SOLARSYSTEMNAME === 'Onuse')
		console.log('Star', solarSystem, solarSystem.hasIncursion);

	return <group>
		<mesh
			onClick={onMeshClick}
			position={solarSystem.position}
			material={material}
		>
			{
				solarSystem.hasIncursion ?
					<tetrahedronBufferGeometry attach="geometry" args={[boxSize]} /> :
					<boxBufferGeometry attach="geometry" args={[boxSize, boxSize, boxSize]} />
			}
		</mesh>
	</group>
}