import { useEffect, useMemo } from 'react';
import ThreeOrbitControls from 'three-orbitcontrols';
import { useThree, useRender } from 'react-three-fiber';

export default function OrbitControlsComponent(
	canvas,
	camera,
	{
		damping = 0.2,
		minAzimuthAngle = -Infinity,
		maxAzimuthAngle = Infinity,
		autoRotateSpeed = false,
		enablePan = true,
		enableRotate = true,
		enableZoom = true
	}
) {
	console.log('useOrbitControls', canvas, camera);
	const controls = useMemo(
		() => {
			console.log('-- new ThreeOrbitControls');
			const controls = new ThreeOrbitControls(camera, canvas);
			controls.damping = damping;
			controls.minAzimuthAngle = minAzimuthAngle;
			controls.maxAzimuthAngle = maxAzimuthAngle;
			controls.enablePan = enablePan;
			controls.enableRotate = enableRotate;
			controls.enableZoom = enableZoom;

			controls.autoRotate = !!autoRotateSpeed;
			controls.autoRotateSpeed = autoRotateSpeed;
			return controls;
		},
		[
			camera,
			canvas,
			damping,
			minAzimuthAngle,
			maxAzimuthAngle,
			autoRotateSpeed,
			enablePan,
			enableRotate,
			enableZoom
		]
	);

	useEffect(() => {
		return () => {
			console.log('-- dispose ThreeOrbitControls');
			controls.dispose();
		};
	}, [controls]);

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
