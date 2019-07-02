import React from 'react';
import SolarSystemName from './SolarSystemName';

export default function SolarSystemSearchResult({ result, onClick }) {
	return (
		<div>
			<a href="#" onClick={() => onClick(result)}>
				<SolarSystemName solarSystem={result} />
			</a>
		</div>
	);
}
