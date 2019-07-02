import React, { useState, useCallback } from 'react';
import StarMap from './StarMap';
import SearchBox from './SearchBox';
import SolarSystemDetails from './solarSystem/SolarSystemDetails';
import StarMapControls from './StarMapControls';

import { solarSystems, jumps } from './data.json';
import SolarSystem from './classes/SolarSystem';

import './styles.css';

const solarSystemsWithPositions = solarSystems.map(solarSystem => new SolarSystem(solarSystem))

const solarSystemsById = solarSystemsWithPositions.reduce((byId, con) => {
	byId[con.SOLARSYSTEMID] = con;
	return byId;
}, {});

export default function App () {
	const [selectedSolarSystem, selectSolarSystem] = useState(null);
	const [showSolarSystems, setShowSolarSystems] = useState(true);
	const [showJumps, setShowJumps] = useState(false);

	return <>
		<StarMap
			jumps={ jumps }
			onSolarSystemClick={selectSolarSystem}
			selectedSolarSystem={selectedSolarSystem}
			showJumps={showJumps}
			showSolarSystems={showSolarSystems}
			solarSystems={ solarSystemsWithPositions }
			solarSystemsById={solarSystemsById}
		/>
		<div id='ui'>
			<StarMapControls
				showJumps={showJumps}
				showSolarSystems={showSolarSystems}
				setShowSolarSystems={setShowSolarSystems}
				setShowJumps={setShowJumps}
			/>
			<SearchBox
				selectedSolarSystem={selectedSolarSystem}
				solarSystems={solarSystemsWithPositions}
				onSolarSystemClick={selectSolarSystem}
			/>
			<SolarSystemDetails
				solarSystem={selectedSolarSystem}
				solarSystemsById={solarSystemsById}
				jumps={ jumps }
				onSolarSystemClick={selectSolarSystem}
			/>
		</div>
	</>
}
