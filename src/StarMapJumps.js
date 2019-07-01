import React, { useMemo } from 'react';
import * as THREE from 'three';

import Jump from './Jump';

export default function StarMapJumps({ solarSystemsById, jumps }) {
	return useMemo(() => jumps.map((jump, index) => (
			<Jump start={solarSystemsById[jump[0]]} end={solarSystemsById[jump[1]]} key={index} />
		)), []);
}
