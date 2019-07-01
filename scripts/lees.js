function convertRawDataToUsableData() {
	const rawDataRows = require('./mapSolarSystems.json').Sheet1;
	const rawDataJumps = require('./universe-pretty.json').jumps;
	const rawDataIncursions = require('./incursions.json');

	const jumps = rawDataJumps
		.map((jump) => [ jump.from, jump.to ].sort())
		.filter((jump, i, all) => i !== all.findIndex((j) => j[0] === jump[0] && j[1] === jump[1]));
	// [[a, b], []]

	const firstRow = rawDataRows.shift();
	const solarSystems = rawDataRows
		.map((solarSystem) =>
			Object.keys(solarSystem).reduce(
				(obj, letter) => ({
					...obj,
					[firstRow[letter]]: solarSystem[letter]
				}),
				{}
			)
		)
		.map((solarSystem) => {
			solarSystem.hasIncursion = rawDataIncursions.some((incursion) =>
				incursion.infested_solar_systems.includes(solarSystem.SOLARSYSTEMID)
			);
			return solarSystem;
		});

	return {
		solarSystems,
		jumps
	};
}

// Output, array of:

// { REGIONID: 10000001,
//     CONSTELLATIONID: 20000014,
//     SOLARSYSTEMID: 30000096,
//     SOLARSYSTEMNAME: 'Mahnagh',
//     X: -60873887339427160,
//     Y: 59027758123983710,
//     Z: -96570831066937980,
//     XMIN: -60877382607877050,
//     XMAX: -60871819787177060,
//     YMIN: 59027630869997460,
//     YMAX: 59027833271072720,
//     ZMIN: 96570198226844910,
//     ZMAX: 96572294514218260,
//     LUMINOSITY: 0.4387,
//     BORDER: 0,
//     FRINGE: 1,
//     CORRIDOR: 0,
//     HUB: 0,
//     INTERNATIONAL: 0,
//     REGIONAL: 0,
//     CONSTELLATION: 0,
//     SECURITY: 0.2050033779664229,
//     RADIUS: 2781410349996,
//     SUNTYPEID: 3803,
//     SECURITYCLASS: 'B3' }

console.log(JSON.stringify(convertRawDataToUsableData(), null, '\t'));
