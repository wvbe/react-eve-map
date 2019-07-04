import React from 'react';
import * as THREE from 'three';

const jumpMaterial = new THREE.LineBasicMaterial({
	color: 0x444422
});

const jumpInterregionMaterial = new THREE.LineBasicMaterial({
	color: 0x333366
});

export default function Jump({ start, end }) {
	const geometry = new THREE.Geometry();
	geometry.vertices.push(start.position);
	geometry.vertices.push(end.position);

	return (
		<group>
			<line
				geometry={geometry}
				material={start.REGIONNAME !== end.REGIONNAME ? jumpInterregionMaterial : jumpMaterial}
			/>
		</group>
	);
}
