
import { Vector3 } from 'three';

const cosmicMultiplier = 1e-15;

export default function getVector3ForConstellation (constellation) {
	return new Vector3(constellation.X * cosmicMultiplier, -constellation.Y * cosmicMultiplier, -constellation.Z * cosmicMultiplier)
}