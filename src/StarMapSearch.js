import React, { useState } from 'react';

export default function StarMapSearch({ selectedSolarSystem, solarSystems, onSolarSystemClick }) {
	const [ searchInput, setSearchInput ] = useState('');

	const results = searchInput
		? solarSystems.filter((solarSystem) => {
				return (
					(typeof solarSystem.SOLARSYSTEMNAME === 'string' &&
						solarSystem.SOLARSYSTEMNAME.includes(searchInput))
				);
			})
		: [];
	return (
		<div>
			<h1>STARMAP SEARCH ({results.length})</h1>
			<input onChange={(event) => setSearchInput(event.target.value)} value={searchInput} />
			<ul>
				{results
					.slice(0, 50).map((result) => (
					<li key={result.SOLARSYSTEMID}>
						<a onClick={() => onSolarSystemClick(null, result)}>{result.SOLARSYSTEMNAME}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
