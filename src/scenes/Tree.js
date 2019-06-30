import React, { useEffect, useMemo, useState } from 'react';
import {
	PerspectiveCamera,
	Vector3,
	Color,
	SphereBufferGeometry,
	PlaneGeometry,
	MeshPhongMaterial,
	TextGeometry,
	FontLoader
} from 'three';
import {
	Canvas,
	useRender,
	useThree
} from 'react-three-fiber';

import * as materials from '../materials';

import NonBranchingLine, { getRandomVertices as x } from '../compositions/NonBranchingLine';
import BranchingLine, { getRandomVertices } from '../compositions/BranchingLine';
import TextFromFont from '../compositions/TextFromFont';
import TextInQuickSuccession from '../compositions/TextInQuickSuccession';
import OrbitControls from '../compositions/OrbitControls';
import Background from '../compositions/Background';
import TrackballControls from '../compositions/TrackballControls';

const subjects = [
	'web', 'responsive', 'interaction', 'tech', 'schema', 'nodejs', 'full-stack', 'intergalactic',
	'usability', 'experience', 'multi-disciplinary', 'open-source', 'frontend', 'art', 'devops', 'graphic',
	'software', 'creative', 'javascript', 'pixel', 'internet', 'communications', 'app', 'React', 'NodeJS', 'XML',
	'XQuery'
].map(x => x.toLowerCase());

const roles = [
	'developer', 'designer', 'enthousiast', 'guru', 'ninja', 'wizard', 'harry', 'programmer', 'engineer',
	'professional', 'architect', 'evangelist', 'strategist', 'consultant', 'technician', 'master', 'hacker',
	'guy', 'person', 'buddy', 'pusher'
];


export default function Tree () {
	const camera = new PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		1,
		1000);
	camera.position.set(16, -16, 60);
	camera.lookAt(new Vector3(0, 0, 0));

	return <Canvas camera={ camera }>
		<OrbitControls
			enablePan={false}
			enableRotate={false}
			enableZoom={false}
			autoRotateSpeed={ 0.2 }
		/>
		<TrackballControls panSpeed={0}/>
		<Background color={0xFCFCFC} />

		{ Array.from(new Array(5)).map((x, i) => <BranchingLine
			key={i}
			vertices={getRandomVertices({
				length: 30 + Math.round(100 * Math.random()),
				stepSize: 3 + 4 * Math.random(),
				maxDepth: 10
			})}
			material={materials.basicBlack}
			// Vertex={() => null}
		/>)}

		<group position={[-14, 0, 0]}>
			<TextFromFont text='wybe minnebo' material={ materials.basicBlack } position={[0, 0, 0]} />
			<TextInQuickSuccession
				texts={Array.from(new Array(300)).map(() => [
					subjects[Math.floor(Math.random() * subjects.length)],
					roles[Math.floor(Math.random() * roles.length)],
				].join(' '))}
				material={ materials.basicBlack }
				position={[0, -2, 0]}
				size={1}
			/>
			<TextFromFont
				text={'and shenanigans'}
				material={ materials.basicBlack }
				position={[0, -4, 0]}
				size={1}
			/>
		</group>
	</Canvas>;
}
