import React from 'react';
import * as materials from '../materials';
import NonBranchingLine, { getRandomVertices as getRandomNonBranchingVertices } from '../compositions/NonBranchingLine';
import { Geometry, Vector3 } from 'three';
export function getRandomVertices ({
	length = 50,
	stepSize = 3,
	branchProbability = 0.01,
	maxDepth = 5,
	depthAlongTree = 0,
	depthAlongBranch = 0,
	stepSizeDecay = 0.5,
	branchProbabilityDecay = 0.2
}) {
	console.log('BranchingLine getRandomVertices', 'L:' + length, 'S:' + stepSize, 'p:' + branchProbability, 'D:' + depthAlongTree);
	return getRandomNonBranchingVertices(length, stepSize)
		.reduce((line, potentiallyBranchingVertex, i) => {
			let branchAmount = 0;
			while (
				depthAlongTree < maxDepth &&
				branchAmount < 100 &&
				Math.random() <= branchProbability
			) {
				branchAmount++;
			}

			return [
				...line,
				potentiallyBranchingVertex,
				...(Array.from(new Array(branchAmount))
					.map(() => getRandomVertices({
						length: Math.round(Math.max(0, length - depthAlongBranch) * 0.5),
						stepSize: stepSize * stepSizeDecay,
						branchProbability: branchProbability * branchProbabilityDecay,
						maxDepth : maxDepth,
						depthAlongTree: depthAlongTree + 1,
						depthAlongBranch: depthAlongBranch,
						stepSizeDecay: stepSizeDecay,
						branchProbabilityDecay: branchProbabilityDecay
					})))
			];
		}, []);
}

export default function BranchingLine ({
	position,
	material,
	vertices,
	catmullRom,
	depthAlongTree = 0,
	Vertex = ({ position, depthAlongBranch, depthAlongTree }) => <mesh position={position} material={materials.wireframe}>
		<tetrahedronBufferGeometry attach="geometry" args={[0.05 + depthAlongTree * 0.3 + depthAlongBranch * 0.6]} />
	</mesh>
}) {
	const geometry = new Geometry();
	vertices
		.filter(vertex => !Array.isArray(vertex))
		.forEach(vertex => geometry.vertices.push(vertex));

	const groups = [];
	vertices.reduce((lastVertexOnMainBranch, vertex, i) => {
		if (Array.isArray(vertex)) {
			groups.push(<BranchingLine key={i} depthAlongTree={ depthAlongTree } vertices={ vertex } position={lastVertexOnMainBranch} material={material} Vertex={Vertex} />);
			return lastVertexOnMainBranch;
		}
		return vertex;
	});


	return <group position={ position }>
		<NonBranchingLine catmullRom={ catmullRom } vertices={ vertices.filter(vertex => !Array.isArray(vertex)) } material={materials.basicGray} />
		{ vertices
			.filter(vertex => !Array.isArray(vertex))
			.map((vertex, i, all) => <Vertex key={i} position={vertex} depthAlongTree={ depthAlongTree } depthAlongBranch={i / all.length}/>)
		}

		{ groups }
	</group>;
}