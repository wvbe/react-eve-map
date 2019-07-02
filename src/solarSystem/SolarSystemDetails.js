import React, { useMemo } from 'react';
import SolarSystemName from './SolarSystemName';

export default function SolarSystemDetails({ solarSystem, jumps, solarSystemsById, onSolarSystemClick }) {
	const jumpsForSolarSystem = useMemo(
		() => (solarSystem ? jumps.filter((jump) => jump.includes(solarSystem.SOLARSYSTEMID)) : []),
		[ solarSystem ]
	);

	if (!solarSystem) {
		return <p><span className='read-safety'>No solar system selected</span></p>;
	}

	return (
		<div>
			<h1>
				<SolarSystemName solarSystem={solarSystem} />
			</h1>

			{solarSystem.hasIncursion && (
				<p style={{color: 'red'}}>
					<b className='read-safety'>Incursion in this system</b>
				</p>
			)}
			{solarSystem.isWormhole && (
				<p style={{color: 'red'}}>
					<b className='read-safety'>Wormhole space</b>
				</p>
			)}
			<table>
				<tbody>
					<tr>
						<th><span className='read-safety'>ID</span></th>
						<td><span className='read-safety'>{solarSystem.SOLARSYSTEMID}</span></td>
					</tr>
					<tr>
						<th><span className='read-safety'>Security</span></th>
						<td><span className='read-safety'>{solarSystem.SECURITY}</span></td>
					</tr>
					<tr>
						<th><span className='read-safety'>Region</span></th>
						<td><span className='read-safety'>{solarSystem.REGIONNAME}</span></td>
					</tr>
					<tr>
						<th><span className='read-safety'>Constellation</span></th>
						<td><span className='read-safety'>{solarSystem.CONSTELLATIONNAME}</span></td>
					</tr>
					<tr>
						<th><span className='read-safety'>Luminosity</span></th>
						<td><span className='read-safety'>{solarSystem.LUMINOSITY}</span></td>
					</tr>
					<tr>
						<th><span className='read-safety'>Sun type</span></th>
						<td><span className='read-safety'>{solarSystem.SUNTYPEID}</span></td>
					</tr>
					<tr>
						<th><span className='read-safety'>Gates</span></th>
						<td>
							{jumpsForSolarSystem.map((jump) => {
								const destination =
									solarSystemsById[jump.find((id) => id !== solarSystem.SOLARSYSTEMID)];
								return (
									<div key={destination.SOLARSYSTEMID}>
										<a href='#' onClick={() => onSolarSystemClick(destination)}>
											<SolarSystemName solarSystem={destination} />
										</a>;
									</div>
								);
							})}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
