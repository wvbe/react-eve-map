import { useEffect, useMemo } from 'react';
import ThreeOrbitControls from 'three-orbitcontrols';
import {
	useThree,
	useRender
} from 'react-three-fiber';


export default function OrbitControlsComponent ({
	target,
	damping = 0.2,
	minAzimuthAngle = -Infinity,
	maxAzimuthAngle = Infinity,
	autoRotateSpeed = false,
	enablePan = true,
	enableRotate = true,
	enableZoom = true
}) {
	console.log('OrbitControls');

	const {
		canvas,
		camera
	} = useThree();

	const controls = useMemo(() => {
		console.log('-- new ThreeOrbitControls');
		const controls = new ThreeOrbitControls(camera, canvas);
		controls.damping = damping;
		controls.minAzimuthAngle = minAzimuthAngle;
		controls.maxAzimuthAngle = maxAzimuthAngle;
		controls.enablePan = enablePan;
		controls.enableRotate = enableRotate;
		controls.enableZoom = enableZoom;

		// controls.target = new Vector3(x,y,z)

		controls.autoRotate = !!autoRotateSpeed;
		controls.autoRotateSpeed = autoRotateSpeed;

		console.log(controls);
		return controls;
	}, [
		camera,
		canvas,
		damping,
		minAzimuthAngle,
		maxAzimuthAngle,
		autoRotateSpeed,
		enablePan,
		enableRotate,
		enableZoom]);

	useEffect(() => {
		// scene.background = new Color(0x000000);
		return () => {
			console.log('-- dispose ThreeOrbitControls');
			controls.dispose();
		}
	}, [controls]);

	if (controls.target !== target) {
		controls.target = target;
		controls.update();
	}

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
