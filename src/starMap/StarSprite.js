import React, { useMemo } from 'react';
import * as THREE from 'three';

import starSpriteUrl from './starSprite.png';
const starMaterialByColor = {};
var spriteMap = new THREE.TextureLoader().load(starSpriteUrl);
var spriteMaterial = new THREE.SpriteMaterial({
	map: spriteMap,
	color: 0xffffff,
	sizeAttenuation: false
});
export default function Star({
	// Required
	solarSystem,

	// Not required
	onClick
}) {
	const onMeshClick = onClick
		? (event) => {
				event.stopPropagation();
				onClick(solarSystem);
			}
		: null;

	return (
		<group position={solarSystem.position}>
			<sprite material={spriteMaterial} scale={[0.01, 0.01, 0.01]} onClick={onMeshClick} />
		</group>
	);
}
