const glob = require('glob');
const yaml = require('js-yaml');
const util = require('util');
const path = require('path');
const fs = require('fs');
const sdePath = path.resolve(__dirname, '..', 'sde');
const globPromise = util.promisify(glob);

async function convertRawDataToUsableData() {
	// Using STDERR because STDOUT is meant to be piped to a file
	console.error('Globbing .staticdata files');
	const allTheFiles = (await globPromise('**/*.staticdata', { cwd: sdePath }))

	console.error('Loading static JSONs');
	const rawDataRows = require('./mapSolarSystems.json').Sheet1;
	const rawDataJumps = require('./universe-pretty.json').jumps;
	const rawDataIncursions = require('./incursions.json');

	console.error('Deduplicating jumps');
	const jumps = rawDataJumps
		.map((jump) => [ jump.from, jump.to ].sort())
		.filter((jump, i, all) => i !== all.findIndex((j) => j[0] === jump[0] && j[1] === jump[1]));
	// [[a, b], []]

	console.error('Cleaning up solar system data');
	const firstRow = rawDataRows.shift();
	const allColumnNames = Object.keys(firstRow).map(l => firstRow[l]);
	const solarSystems = 
	
		// rawDataRows
		// .map((solarSystem) =>
		// 	Object.keys(solarSystem).reduce(
		// 		(obj, letter) => ({
		// 			...obj,
		// 			[firstRow[letter]]: solarSystem[letter]
		// 		}),
		// 		{}
		// 	)
		// )

		// .concat(
	allTheFiles
		.filter(yamlFilePath => yamlFilePath.endsWith('/solarsystem.staticdata'))
		.map(yamlFilePath => {
			console.error('- Read ' + yamlFilePath);
			var doc = yaml.safeLoad(fs.readFileSync(path.join(sdePath, yamlFilePath), 'utf8'));
			return Object.keys(doc).reduce((obj, key) => {
				const uKey = key.toUpperCase();
				if (!allColumnNames.includes(uKey)) {
					return obj;
				}

				obj[uKey] = doc[key];
				return obj;
			}, {
				SOLARSYSTEMNAME: path.basename(path.dirname(yamlFilePath)),
				CONSTELLATIONNAME: path.basename(path.dirname(path.dirname(yamlFilePath))),
				REGIONNAME: path.basename(path.dirname(path.dirname(path.dirname(yamlFilePath)))),
				X: doc.center[0],
				Y: doc.center[1],
				Z: doc.center[2],
				XMIN: doc.min[0],
				YMIN: doc.min[1],
				ZMIN: doc.min[2],
				XMAX: doc.max[0],
				YMAX: doc.max[1],
				ZMAX: doc.max[2],
				isWormhole: yamlFilePath.startsWith('fsd/universe/wormhole/')
			});
		})
		.map((solarSystem) => {
			solarSystem.hasIncursion = rawDataIncursions.some((incursion) =>
				incursion.infested_solar_systems.includes(solarSystem.SOLARSYSTEMID)
			);
			return solarSystem;
		});

	console.error('Done');
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

convertRawDataToUsableData()
	.then(data => console.log(JSON.stringify(data, null, '\t')));
