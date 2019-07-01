import React, { useMemo } from 'react';

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
				{solarSystem.SOLARSYSTEMNAME} ({Math.round(100 * solarSystem.SECURITY) / 100})
			</h1>

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
											<a onClick={() => onSolarSystemClick(null, destination)}>
												{destination.SOLARSYSTEMNAME}
											</a>;
										</li>
									);
								})}
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
			{solarSystem.hasIncursion && (
				<p>
					<b>Incursion alert</b>
				</p>
			)}
		</div>
	);
}
