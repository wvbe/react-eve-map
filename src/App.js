import React, { useState, useCallback } from 'react';
import StarMap from './StarMap';
import StarMapSearch from './StarMapSearch';
import SolarSystemDetails from './SolarSystemDetails';

import { solarSystems, jumps } from './data.json';
import SolarSystem from './classes/SolarSystem';

const solarSystemsWithPositions = solarSystems.map(solarSystem => new SolarSystem(solarSystem))

const solarSystemsById = solarSystemsWithPositions.reduce((byId, con) => {
	byId[con.SOLARSYSTEMID] = con;
	return byId;
}, {});

export default function App () {
	const [selectedSolarSystem, selectSolarSystem] = useState(null);
	const onSolarSystemClick = useCallback((event, solarSystem) => selectSolarSystem(solarSystem), [selectSolarSystem]);
	return <>
		<StarMap
			selectedSolarSystem={selectedSolarSystem}
			solarSystems={ solarSystemsWithPositions }
			solarSystemsById={solarSystemsById}
			jumps={ jumps }
			onSolarSystemClick={onSolarSystemClick}
		/>
		<div style={{ position: 'absolute', top: '30px', left: '30px' }}>
			<StarMapSearch
				selectedSolarSystem={selectedSolarSystem}
				solarSystems={solarSystemsWithPositions}
				onSolarSystemClick={onSolarSystemClick}
			/>
			<SolarSystemDetails
				solarSystem={selectedSolarSystem}
				solarSystemsById={solarSystemsById}
				jumps={ jumps }
				onSolarSystemClick={onSolarSystemClick}
			/>
		</div>
	</>
}
