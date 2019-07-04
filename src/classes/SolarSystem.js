
import { Vector3 } from 'three';

const cosmicMultiplier = 1e-15;

export function getVector3 (constellation) {
	return new Vector3(constellation.X * cosmicMultiplier, -constellation.Y * cosmicMultiplier, -constellation.Z * cosmicMultiplier)
}

export default class SolarSystem {
	constructor (jsonData) {
		Object.keys(jsonData).forEach(key => this[key] = jsonData[key]);

		this.position = getVector3(jsonData);
	}
	getSpriteName () {
		if (this.hasIncursion) {
			return 'triangleDown';
		}
		if (this.isWormhole) {
			return 'triangleUp';
		}
		return 'circle';
	}
	getColor () {
		if (this.hasIncursion) {
			return '#8888ff';
		}
		if (this.isWormhole) {
			return 'white';
		}
		const security = this.SECURITY;
		if (security < 0.05) {
			return 'red';
		}
		if (security < 0.15) {
			return '#b12b04';
		}
		if (security < 0.25) {
			return '#c43e04';
		}
		if (security < 0.35) {
			return '#c45104';
		}
		if (security < 0.45) {
			return '#b16405';
		}
		if (security < 0.55) {
			return '#f0f000';
		}
		if (security < 0.65) {
			return '#90f030';
		}
		if (security < 0.75) {
			return '#00ef00';
		}
		if (security < 0.85) {
			return '#00f048';
		}
		if (security < 0.95) {
			return '#47efbf';
		}
		return '#2fefef';
	}
}