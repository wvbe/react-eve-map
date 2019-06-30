import { useEffect } from 'react';
import ThreeTrackballControls from 'three-trackballcontrols';
import {
	useThree,
	useRender
} from 'react-three-fiber';


export default function OrbitControlsComponent ({
	damping = 0.2,
	zoomSpeed = 1.2,
	panSpeed = 0.8,
	rotateSpeed = 16
}) {
	const {
		canvas,
		camera,
		render
	} = useThree();

	let controls = null;

	useEffect(() => {
		console.log('-- new ThreeTrackballControls');
		controls = new ThreeTrackballControls(camera, canvas);

		controls.rotateSpeed = rotateSpeed;
		controls.zoomSpeed = zoomSpeed;
		controls.panSpeed = panSpeed;

		controls.noZoom = !zoomSpeed;
		controls.noPan = !panSpeed;

		controls.staticMoving = true;
		controls.dynamicDampingFactor = damping;

		controls.keys = [
			65, // key A
			83, // key S
			68 // key D
		];
		// controls.addEventListener( 'change', render );
		// scene.background = new Color(0x000000);

		return () => {
			console.log('-- dispose ThreeTrackballControls');
			controls.dispose();
			controls = null;
		}
	}, [camera, canvas]);

	useRender(() => {
		if (!controls) {
			return;
		}

		controls.update();
	});



	return null;
}
