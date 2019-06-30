import React from 'react';
import {
	MeshStandardMaterial,
	MeshBasicMaterial,
	Shape,
	ShapeGeometry,
	ExtrudeGeometry
} from 'three';

import Mesh from '../three/Mesh'

const area1 = new Shape();
area1.moveTo(0, -0);
area1.lineTo(2, -0);
area1.lineTo(0, -2);
area1.lineTo(0, -0);

const area2 = new Shape();
area2.moveTo(2, -0);
area2.lineTo(4, -0);
area2.lineTo(4, -4);
area2.lineTo(1, -1);
area2.lineTo(2, -0);

const area3 = new Shape();
area3.moveTo(1, -1);
area3.lineTo(2, -2);
area3.lineTo(1, -3);
area3.lineTo(0, -2);
area3.lineTo(1, -1);

const area4 = new Shape();
area4.moveTo(0, -2);
area4.lineTo(2, -4);
area4.lineTo(0, -4);
area4.lineTo(0, -2);

const area5 = new Shape();
area5.moveTo(2, -2);
area5.lineTo(4, -4);
area5.lineTo(2, -4);
area5.lineTo(1, -3);
area5.lineTo(2, -2);

export default function FontoLogo ({}) {
	const materials = [
		new MeshStandardMaterial({ color: 0x6AE185 }),
		new MeshStandardMaterial({ color: 0xD11A70 }),
		new MeshStandardMaterial({ color: 0xFFFFFF }),
		new MeshStandardMaterial({ color: 0x0D004C }),
		new MeshStandardMaterial({ color: 0x6AE185 })
	];
	const shapes = [
		area1,
		area2,
		area3,
		area4,
		area5
	];
	const geometries = shapes.map((shape, i) => new ExtrudeGeometry(shape, {
		steps: 1,
		depth: 1 + Math.random(),
		bevelEnabled: false
	}));

	return geometries.map((geo, i) => <Mesh key={ i } geometry={ geo } material={ materials[i] } />);
}