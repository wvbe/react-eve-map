import React from 'react';
import * as THREE from 'three';

const jumpMaterial = new THREE.LineBasicMaterial({
	wireframe: true,
	color: 'black',
	opacity: 0.3
});
const jumpInterregionMaterial = new THREE.LineBasicMaterial({
	wireframe: true,
	color: 'blue',
	opacity: 0.5
});
export default function Jump ({ start, end }) {
	const geometry = new THREE.Geometry();
	geometry.vertices.push(start.position);
	geometry.vertices.push(end.position);

	return <group><line geometry={geometry} material={ start.REGIONNAME !== end.REGIONNAME ? jumpInterregionMaterial : jumpMaterial } /></group>;
}