import React, { useMemo } from 'react';

import Star from './Star';

export default function StarMapJumps({ solarSystems, onSolarSystemClick, visible = true }) {
	const starComponents = useMemo(() => solarSystems.map((solarSystem, index) => (
		<Star key={index} solarSystem={solarSystem} onClick={onSolarSystemClick} visible={visible} />
	)), []);

	return <group visible={visible}>{ starComponents }</group>;
}
