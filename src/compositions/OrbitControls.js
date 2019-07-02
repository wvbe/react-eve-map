import { useEffect, useMemo } from 'react';
import ThreeOrbitControls from 'three-orbitcontrols';
import { useThree, useRender } from 'react-three-fiber';

export default function OrbitControlsComponent({
	target,
	damping = 0.2,
	minAzimuthAngle = -Infinity,
	maxAzimuthAngle = Infinity,
	autoRotateSpeed = false,
	enablePan = true,
	enableRotate = true,
	enableZoom = true,
	zoomSpeed = 0.5
}) {
	const { canvas, camera } = useThree();

	const controls = useMemo(
		() => {
			const controls = new ThreeOrbitControls(camera, canvas);

			return controls;
		},
		[ camera, canvas ]
	);

	useEffect(
		() => {
			// scene.background = new Color(0x000000);
			return () => {
				controls.dispose();
			};
		},
		[ controls ]
	);

	controls.damping = damping;
	controls.minAzimuthAngle = minAzimuthAngle;
	controls.maxAzimuthAngle = maxAzimuthAngle;
	controls.enablePan = enablePan;
	controls.enableRotate = enableRotate;
	controls.enableZoom = enableZoom;
	controls.zoomSpeed = zoomSpeed;

	// controls.target = new Vector3(x,y,z)

	controls.autoRotate = !!autoRotateSpeed;
	controls.autoRotateSpeed = autoRotateSpeed;

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
