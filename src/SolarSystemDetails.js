import React, { useMemo } from 'react';
import SolarSystemName from './SolarSystemName';

export default function SolarSystemDetails({ solarSystem, jumps, solarSystemsById, onSolarSystemClick }) {
	const jumpsForSolarSystem = useMemo(
		() => (solarSystem ? jumps.filter((jump) => jump.includes(solarSystem.SOLARSYSTEMID)) : []),
		[ solarSystem ]
	);

	if (!solarSystem) {
		return <p>No solar system selected</p>;
	}

	return (
		<div>
			<h1>
				<SolarSystemName solarSystem={solarSystem} />
			</h1>

			{solarSystem.hasIncursion && (
				<p style={{color: 'red'}}>
					<b>Incursion in this system</b>
				</p>
			)}
			{solarSystem.isWormhole && (
				<p style={{color: 'red'}}>
					<b>Wormhole space</b>
				</p>
			)}
			<table>
				<tbody>
					<tr>
						<th>ID</th>
						<td>{solarSystem.SOLARSYSTEMID}</td>
					</tr>
					<tr>
						<th>Security</th>
						<td>{solarSystem.SECURITY}</td>
					</tr>
					<tr>
						<th>Region</th>
						<td>{solarSystem.REGIONNAME}</td>
					</tr>
					<tr>
						<th>Constellation</th>
						<td>{solarSystem.CONSTELLATIONNAME}</td>
					</tr>
					<tr>
						<th>Luminosity</th>
						<td>{solarSystem.LUMINOSITY}</td>
					</tr>
					<tr>
						<th>Sun type</th>
						<td>{solarSystem.SUNTYPEID}</td>
					</tr>
					<tr>
						<th>Gates</th>
						<td>
							<ul>
								{jumpsForSolarSystem.map((jump) => {
									const destination =
										solarSystemsById[jump.find((id) => id !== solarSystem.SOLARSYSTEMID)];
									return (
										<li key={destination.SOLARSYSTEMID}>
											<a href='#' onClick={() => onSolarSystemClick(null, destination)}>
												<SolarSystemName solarSystem={destination} />
											</a>;
										</li>
									);
								})}
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
