import React from 'react';

export default function SolarSystemDetails({ showSolarSystems, showJumps, setShowSolarSystems, setShowJumps }) {
	return <>
		<div>
			<a className='read-safety' href="#" onClick={() => setShowSolarSystems(!showSolarSystems)}>
				{showSolarSystems ? 'Hide' : 'Show'} systems
			</a>
		</div>
		<div>
			<a className='read-safety' href="#" onClick={() => setShowJumps(!showJumps)}>
				{showJumps ? 'Hide' : 'Show'} jumps
			</a>
		</div>
	</>;
}
