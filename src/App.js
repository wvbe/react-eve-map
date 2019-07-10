import LoginBox from './LoginBox';
import React, { useState, useCallback } from 'react';
import SearchBox from './SearchBox';
import SolarSystemDetails from './solarSystem/SolarSystemDetails';
import StarMap from './StarMap';
import StarMapControls from './StarMapControls';
import UserBox from './UserBox';

import { solarSystems, jumps } from './data.json';
import SolarSystem from './classes/SolarSystem';
import './styles.css';

const solarSystemsWithPositions = solarSystems
	// Hide wormholes for now, need a better UI transition from k-space to show wormhole/abyssal universe
	.filter(solarSystems => !solarSystems.isWormhole)

	// Instantiate objects
	.map(solarSystem => new SolarSystem(solarSystem))

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
			<LoginBox />
			<UserBox />
			{/* <PilotBox /> */}
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
