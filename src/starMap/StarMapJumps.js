import React, { useMemo } from 'react';

import Jump from './Jump';

export default function StarMapJumps({ solarSystemsById, jumps, visible = true }) {
	const jumpComponents = useMemo(() => jumps.map((jump, index) => (
			<Jump start={solarSystemsById[jump[0]]} end={solarSystemsById[jump[1]]} key={index} />
		)), []);

	// Toggling visibility to false is more expensive
	return <group visible={visible}>{ jumpComponents }</group>;
}
