import React from 'react';

function getEmojiForSolarSystem (solarSystem) {
	if (solarSystem.hasIncursion) {
		return '⚠️';
	}
	if (solarSystem.isWormhole) {
		return '🕳️';
	}
	return null;
}

export default function SolarSystemName ({ solarSystem }) {
	return <span style={{ color: solarSystem.getColor() }}>
		{[
			getEmojiForSolarSystem(solarSystem),
			solarSystem.SOLARSYSTEMNAME,
			'(' + Math.round(10 * solarSystem.SECURITY) / 10 + ')'
		].filter(x => !!x).join(' ')}
	</span>;
}