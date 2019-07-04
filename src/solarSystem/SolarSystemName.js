import React from 'react';

function getEmojiForSolarSystem (solarSystem) {
	// if (solarSystem.hasIncursion) {
	// 	return '⚠️';
	// }
	// if (solarSystem.isWormhole) {
	// 	return '🕳️';
	// }
	return null;
}

export default function SolarSystemName ({ solarSystem }) {
	return <b style={{ color: solarSystem.getColor() }} className='read-safety'>
		{[
			getEmojiForSolarSystem(solarSystem),
			solarSystem.SOLARSYSTEMNAME,
			'(' + Math.round(10 * solarSystem.SECURITY) / 10 + ')'
		].filter(x => !!x).join(' ')}
	</b>
}