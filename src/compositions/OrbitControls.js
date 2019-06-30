import { useEffect } from 'react';
import ThreeOrbitControls from 'three-orbitcontrols';
import {
	useThree,
	useRender
} from 'react-three-fiber';


export default function OrbitControlsComponent ({
	damping = 0.2,
	minAzimuthAngle = -Infinity,
	maxAzimuthAngle = Infinity,
	autoRotateSpeed = false,
	enablePan = true,
	enableRotate = true,
	enableZoom = true
}) {
	const {
		canvas,
		camera
	} = useThree();

	let controls = null;

	useEffect(() => {
		console.log('-- new ThreeOrbitControls');
		controls = new ThreeOrbitControls(camera, canvas);
		controls.damping = damping;
		controls.minAzimuthAngle = minAzimuthAngle;
		controls.maxAzimuthAngle = maxAzimuthAngle;
		controls.enablePan = enablePan;
		controls.enableRotate = enableRotate;
		controls.enableZoom = enableZoom;

		controls.autoRotate = !!autoRotateSpeed;
		controls.autoRotateSpeed = autoRotateSpeed;
		// scene.background = new Color(0x000000);
		return () => {
			console.log('-- dispose ThreeOrbitControls');
			controls.dispose();
			controls = null;
		}
	}, [camera, canvas]);

	useRender(() => {
		if (!controls) {
			return;
		}

		if (!!autoRotateSpeed) {
			controls.update();
		}
	});

	return null;
}
