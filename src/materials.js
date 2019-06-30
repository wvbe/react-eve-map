import {
	MeshBasicMaterial,
	MeshStandardMaterial,
	MeshNormalMaterial,
	SphericalReflectionMapping,
	MeshPhongMaterial,
	MeshToonMaterial,
	DoubleSide
} from 'three';

const globalFlatShading = false,
	globalWireframe = false;

export const wireframe = new MeshBasicMaterial({
	wireframe: true,
	color: 0,
	opacity: 0.5
});

export const normal = new MeshNormalMaterial({
	flatShading: globalFlatShading,
	wireframe: globalWireframe
});

export const whiteMaterial = new MeshPhongMaterial({
	color: 0xeeeeee,
	flatShading: globalFlatShading,
	shininess: 230,
	// side: DoubleSide,
	wireframe: globalWireframe
});

export const softMaterial = new MeshPhongMaterial({
	color: 0xaaaaaa,
	flatShading: globalFlatShading,
	shininess: 0,
	// side: DoubleSide,
	wireframe: globalWireframe
});

export const demoMaterial = new MeshPhongMaterial({
	color: 'rgb(20, 20, 80)',
	flatShading: globalFlatShading,
	shininess: 130,
	specular: 'yellow',
	wireframe: globalWireframe,
});

export const redMaterial = new MeshStandardMaterial({
	color: 0xff0000,
	flatShading: globalFlatShading,
	metalness: 0.5,
	roughness: 0.2,
	wireframe: globalWireframe
});

export const basicWhite = new MeshBasicMaterial({
	color: 0xffffff,
	wireframe: true
})
export const basicBlack = new MeshBasicMaterial({
	color: 0x000000
})
export const basicGray = new MeshBasicMaterial({
	color: 0x000000,
	opacity: 0.25
})