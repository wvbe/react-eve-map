import React, { useMemo } from 'react';
import * as THREE from 'three';

function getColorForSecurityStatus(security) {
	if (security < 0.05) {
		return 'red';
	}
	if (security < 0.15) {
		return '#b12b04';
	}
	if (security < 0.25) {
		return '#c43e04';
	}
	if (security < 0.35) {
		return '#c45104';
	}
	if (security < 0.45) {
		return '#b16405';
	}
	if (security < 0.55) {
		return '#f0f000';
	}
	if (security < 0.65) {
		return '#90f030';
	}
	if (security < 0.75) {
		return '#00ef00';
	}
	if (security < 0.85) {
		return '#00f048';
	}
	if (security < 0.95) {
		return '#47efbf';
	}
	return '#2fefef';
}

export default function Star ({
	// Required
	solarSystem,

	// Not required
	isInvaded,

	// Not required
	onClick
}) {
	const securityColor = getColorForSecurityStatus(solarSystem.SECURITY);
	const material = useMemo(() => new THREE.MeshBasicMaterial({
		wireframe: false,
		color: securityColor,
		opacity: 1
	}), [securityColor]);

	return <group>
		<mesh
			onClick={onClick ? (event) => onClick(event, solarSystem) : null}
			position={solarSystem.position}
			material={material}
		>
			<boxBufferGeometry attach="geometry" args={[1]} />
		</mesh>
	</group>
}