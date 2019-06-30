import React, { useState, useCallback } from 'react';
import StarMap from './StarMap';
import getVector3ForSolarSystem from './getVector3ForSolarSystem';


import { solarSystems, jumps } from './data.json';

const solarSystemsWithPositions = solarSystems.map(solarSystem => ({
	...solarSystem,
	position: getVector3ForSolarSystem(solarSystem)
}))

export default function App () {
	const [selectedSolarSystem, selectSolarSystem] = useState(null);
	const onSolarSystemClick = useCallback((event, solarSystem) => selectSolarSystem(solarSystem), [selectSolarSystem]);
	return <>
		<StarMap
			selectedSolarSystem={selectedSolarSystem}
			solarSystems={ solarSystemsWithPositions }
			jumps={ jumps }
			onSolarSystemClick={onSolarSystemClick}
		/>
		<pre style={{ position: 'absolute', top: '30px', left: '30px' }}>
			{ JSON.stringify(selectedSolarSystem, null, '  ') }
		</pre>
	</>
}
