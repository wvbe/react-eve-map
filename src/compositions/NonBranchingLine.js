import React from 'react';

import { Geometry, Vector3, CatmullRomCurve3 } from 'three';

export function getRandomVertices (
	length = 10,
	stepSize = 3
) {
	const start = new Vector3(0, 0, 0);
	const verts = [start];
	Array.from(new Array(length))
		.reduce((previous, x, i) => {
			const nextVertex = previous.clone().add(new Vector3(
				Math.random() * 2 - 1,
				Math.random() * 2 - 1,
				Math.random() * 2 - 1
			).normalize().multiplyScalar(stepSize));
			verts.push(nextVertex);
			return nextVertex;
		}, start);
	return verts;
}

export default function NonBranchingLine ({
	position,
	material,
	catmullRom = false,
	vertices = []
}) {

	if (vertices.length < 2) {
		// throw new Error(vertices.length + ' vertices is too few for a line');
		// whatever.
		return null;
	}

	let points = null;
	if (catmullRom) {
		var curve = new CatmullRomCurve3(vertices, false, undefined, 30);
		curve.arcLengthDivisions = 10;
		console.log(curve);
		points = curve.getPoints(1000);
	}
	const geometry = new Geometry();

	(points || vertices).forEach(vertice => geometry.vertices.push(vertice));

	return <group position={ position }>
		{/* <mesh>
			<sphereBufferGeometry args={[70, 90, 90]} attach='geometry' />
			<meshBasicMaterial wireframe color={0xeeeeee} attach='material' />
		</mesh> */}
		<line geometry={geometry} material={ material } />
	</group>;
}