import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getCanvas } from '../sprites';

const starMaterialByColor = {};

export default function Star({
	// Required
	solarSystem,

	// Not required
	onClick
}) {
	const spriteName = solarSystem.getSpriteName();
	const securityColor = solarSystem.getColor();
	const spriteCacheName = [spriteName, securityColor].join('/');

	if (!starMaterialByColor[spriteCacheName]) {
		starMaterialByColor[spriteCacheName] = new THREE.SpriteMaterial({
			map: new THREE.CanvasTexture(getCanvas(spriteName, undefined, undefined, securityColor)),
			sizeAttenuation: false
		});
	}

	const onMeshClick = onClick
		? (event) => {
				event.stopPropagation();
				onClick(solarSystem);
			}
		: null;

	return (
		<group position={solarSystem.position}>
			<sprite material={starMaterialByColor[spriteCacheName]} scale={[0.01, 0.01, 0.01]} onClick={onMeshClick} />
		</group>
	);
}
